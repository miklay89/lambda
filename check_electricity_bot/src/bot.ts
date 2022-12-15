import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import cron from "node-cron";
import requestToApi from "./controllers/requesttoapi";
import { IResponse, MessageStatus, MessageText } from "./global/types";

dotenv.config();

// storing data about power status at home
const statusObject = {
  homeWithPower: false,
  timestamp: new Date(),
  powerOnNotification: false,
  powerOffNotification: false,
};

// constants
const token = process.env.BOT_TOKEN as string;
const apiUrl = `${process.env.API_URL as string}${MessageStatus.CHECK}`;
const bot = new TelegramBot(token, { polling: true });

// helper functions
function sendMsgToBot(
  chatId: number,
  text: string,
): Promise<TelegramBot.Message> {
  return bot.sendMessage(chatId, text);
}

// bot logic
// eslint-disable-next-line consistent-return
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  switch (true) {
    // start msg
    case (msg.text !== null || undefined) && msg.text === MessageStatus.START:
      return sendMsgToBot(chatId, MessageText.START);

    // help msg (list of commands)
    case (msg.text !== null || undefined) && msg.text === MessageStatus.HELP:
      return sendMsgToBot(chatId, MessageText.HELP);

    // check msg
    case (msg.text !== null || undefined) && msg.text === MessageStatus.CHECK:
      sendMsgToBot(chatId, MessageText.CHECK_MESSAGE);
      if (statusObject.homeWithPower) {
        return sendMsgToBot(chatId, MessageText.CHECK_VALID);
      }
      return sendMsgToBot(chatId, MessageText.CHECK_INVALID);

    // last seen power time
    case (msg.text !== null || undefined) && msg.text === MessageStatus.LAST:
      return sendMsgToBot(
        chatId,
        `${MessageText.LAST} ${new Date(
          statusObject.timestamp,
        ).toLocaleString()}`,
      );

    // incorrect case
    default:
      return sendMsgToBot(chatId, MessageText.DEFAULT);
  }
});

// pool API by axios + cron
async function poolApi() {
  cron.schedule(`*/1 * * * *`, async () => {
    const res = await requestToApi<IResponse>(apiUrl);

    // notify user about power ON - one time and updating timestamp
    if (res) {
      if (statusObject.powerOnNotification) return;

      statusObject.powerOnNotification = true;
      statusObject.homeWithPower = true;
      statusObject.powerOffNotification = false;
      statusObject.timestamp = res.timestamp;
      sendMsgToBot(
        +(process.env.BOT_CHAT_ID as string),
        MessageText.ONLINE_NOTIFICATION,
      );
      return;
    }

    // notify user about power OFF - one time
    if (!res) {
      if (statusObject.powerOffNotification) return;

      statusObject.homeWithPower = false;
      statusObject.powerOffNotification = true;
      statusObject.powerOnNotification = false;
      sendMsgToBot(
        +(process.env.BOT_CHAT_ID as string),
        MessageText.OFFLINE_NOTIFICATION,
      );
    }
  });
}

poolApi();
