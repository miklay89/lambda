/* eslint-disable import/first */
process.env.NTBA_FIX_319 = "1";
// shift + ctrl + i = prettier work
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import cryptoSymbols from "./requestQueryData/cryptoSymbols";
import addToFavouriteList from "./controllers/addToFavouriteList";
import deleteFromFavouriteList from "./controllers/deleteFromFavouriteList";
import getFavouriteList from "./controllers/getFavouriteList";
import {
  getFullInfo,
  switchFollowingState,
} from "./controllers/getFullInformationAboutChosenCryptoCurrency";
import getListRecent from "./controllers/getListRecent";
import awakeWorker from "./helpers/wakeUpWorker";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const awake = awakeWorker;

const newLine = "\n";

enum BotMessages {
  addToFavouriteListText = "/addToFavourite",
  deleteFromFavouriteListText = "/deleteFavourite",
  getFavouriteListText = "/listFavourite",
  getFullInformationAboutChosenCryptoCurrencyText = `/{cryptoSymbol}`,
  getRecentListText = "/listRecent",
  helpText = "/help",
  startText = "/start",
}

const bot = new TelegramBot(process.env.BOT_TOKEN as string, { polling: true });

bot.on("message", async (msg) => {
  // /start message logic
  if (msg.text?.toString().toLowerCase().indexOf(BotMessages.startText) === 0) {
    bot.sendMessage(
      msg.chat.id,
      `Welcome to crypto currency commutator bot. You can get list of commands using help command - ${BotMessages.helpText}`,
    );
    return;
  }

  // "/help" message logic
  if (msg.text?.toString().toLowerCase().indexOf(BotMessages.helpText) === 0) {
    bot.sendMessage(
      msg.chat.id,
      `- ${BotMessages.startText} - returns start message,
- ${BotMessages.helpText} - returns information about commands,
- ${BotMessages.getRecentListText} - returns recent list about all crypto currencys,
- ${BotMessages.getFullInformationAboutChosenCryptoCurrencyText}* - returns full information about chosen crypto currency (example - /BTC),
- ${BotMessages.addToFavouriteListText} {crypto_symbol}* - adds chosen crypto currency to favourite list (example - /addToFavourite BTC),
- ${BotMessages.getFavouriteListText} - returns list of favourite crypto currencys,
- ${BotMessages.deleteFromFavouriteListText} {crypto_symbol}* - removes chosen crypto currency from favourite list (example - /deleteFavourite BTC),${newLine}
*List of crypto symbols:
${cryptoSymbols}`,
    );
    return;
  }

  // DONE - add to favourite list logic
  if (
    msg.text?.toString().split(" ")[0] === BotMessages.addToFavouriteListText
  ) {
    if (msg.text.toString().split(" ").length < 2) {
      bot.sendMessage(
        msg.chat.id,
        `Please chose one crypto symbol from list and input it like - ${newLine}${BotMessages.addToFavouriteListText} {crypto_symbol}*,${newLine}list of crypto symbols: ${cryptoSymbols}`,
      );
      return;
    }

    const userId = msg.from?.id;
    const cryptoSymbol = msg.text.toString().split(" ")[1];

    if (
      cryptoSymbols.includes(cryptoSymbol) &&
      userId &&
      cryptoSymbol !== null
    ) {
      const message = await addToFavouriteList(userId, cryptoSymbol);
      if (!message) {
        bot.sendMessage(
          msg.chat.id,
          "No conection to server, please try again later.",
        );
        return;
      }
      bot.sendMessage(msg.chat.id, message);
      return;
    }

    bot.sendMessage(
      msg.chat.id,
      `Please chose one crypto symbol from list and input it like - ${newLine}${BotMessages.addToFavouriteListText} {crypto_symbol}*,${newLine}list of crypto symbols: ${cryptoSymbols}`,
    );
    return;
  }

  // DONE - delete from favourite list logic
  if (
    msg.text?.toString().split(" ")[0] ===
    BotMessages.deleteFromFavouriteListText
  ) {
    if (msg.text.toString().split(" ").length < 2) {
      bot.sendMessage(
        msg.chat.id,
        `Please chose one crypto symbol from list and input it like - ${newLine}${BotMessages.deleteFromFavouriteListText} {crypto_symbol}*,${newLine}list of crypto symbols: ${cryptoSymbols}`,
      );
      return;
    }

    const userId = msg.from?.id;
    const cryptoSymbol = msg.text?.toString().split(" ")[1];

    if (
      cryptoSymbols.includes(cryptoSymbol) &&
      userId &&
      cryptoSymbol !== null
    ) {
      const message = await deleteFromFavouriteList(userId, cryptoSymbol);
      if (!message) {
        bot.sendMessage(
          msg.chat.id,
          "No conection to server, please try again later.",
        );
        return;
      }
      bot.sendMessage(msg.chat.id, message);
      return;
    }

    bot.sendMessage(
      msg.chat.id,
      `Please chose one crypto symbol from list and input it like - ${newLine}${BotMessages.deleteFromFavouriteListText} {crypto_symbol}*,${newLine}list of crypto symbols: ${cryptoSymbols}`,
    );
    return;
  }

  // DONE - get favourite list logic
  if (msg.text?.toString().indexOf(BotMessages.getFavouriteListText) === 0) {
    const userId = msg.from?.id;
    if (userId) {
      const message = await getFavouriteList(userId);
      if (!message) {
        bot.sendMessage(
          msg.chat.id,
          "No conection to server, please try again later.",
        );
        return;
      }
      bot.sendMessage(msg.chat.id, message);
      return;
    }
  }

  // get full information about crypto chosen currency logic
  // switch following state by inline button;
  if (
    cryptoSymbols.includes(msg.text?.toString().slice(1) as string) &&
    msg.text?.toString().slice(1) !== null
  ) {
    const cryptoSymbol = msg.text?.toString().slice(1);
    const userId = msg.from?.id;
    if (userId && cryptoSymbol && cryptoSymbol !== null) {
      const message = await getFullInfo(userId, cryptoSymbol);
      if (!message) {
        bot.sendMessage(
          msg.chat.id,
          "No conection to server, please try again later.",
        );
        return;
      }
      if (message.isFollowing) {
        bot.sendMessage(msg.chat.id, message.message, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Delete from following",
                  callback_data: "switchFollowingState",
                },
              ],
            ],
          },
        });
        return;
      }
      bot.sendMessage(msg.chat.id, message.message, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Add to following",
                callback_data: "switchFollowingState",
              },
            ],
          ],
        },
      });
      return;
    }
  }

  // get recent list logic
  if (msg.text?.toString().indexOf(BotMessages.getRecentListText) === 0) {
    const message = await getListRecent();
    if (!message) {
      bot.sendMessage(
        msg.chat.id,
        "No conection to server, please try again later.",
      );
      return;
    }
    bot.sendMessage(msg.chat.id, message);
    return;
  }

  // any another message handler
  bot.sendMessage(
    msg.chat.id,
    `Your input incorect, please input or push ${BotMessages.startText}  for starting a bot,
or use ${BotMessages.helpText} for view list of bot commands`,
  );
});

// switching following state logic
bot.on("callback_query", async (text) => {
  if (text.data === "switchFollowingState") {
    const userId = text.from.id;
    if (!text.message?.text) {
      return;
    }
    const cryptoSymbolString = text.message?.text
      .toString()
      .split(":")[0]
      .split("-");
    const cryptoSymbol = cryptoSymbolString[1].slice(
      1,
      cryptoSymbolString[1].length,
    );
    const chatId = text.message?.chat.id;
    const data = await switchFollowingState(userId, cryptoSymbol);
    if (!data) {
      bot.sendMessage(
        chatId,
        "No conection to server, please try again later.",
      );
      return;
    }
    const message = `Following state was changed, use /${cryptoSymbol} command to see it.`;
    bot.answerCallbackQuery(text.id);
    bot.sendMessage(chatId, message);
  }
});
