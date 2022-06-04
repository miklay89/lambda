process.env.NTBA_FIX_319 = '1';
import dotenv from 'dotenv'
import TelegramBot from 'node-telegram-bot-api';
import getWeatherData from './helpers/getDataFromAPI';
import dataPrettier from './helpers/dataHandler';
import { onlyThreeHoursForecast, onlySixHoursForecast } from './helpers/dataHandler';
import Response from './helpers/responseDataInterface';
dotenv.config()

// https://openweathermap.org/forecast5
const weather_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${process.env.LATITUDE}&lon=${process.env.LONGTITUDE}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

enum BotKeys {
  threeHours = "3 hours forecast",
  sixHours = "6 hours forecast",
}

const bot = new TelegramBot(process.env.BOT_TOKEN as string, {polling: true});

bot.on('message', async (msg) => {
  const start = "/start";
  const sixHours = BotKeys.sixHours;
  const threeHours = BotKeys.threeHours;


  if (msg.text?.toString().toLowerCase().indexOf(start) === 0) {
    
    bot.sendMessage(
      msg.chat.id, 
      "Welcome to forecast weather bot in Madrid, please select hourly forecast options from keyboard", 
      {
        "reply_markup": { 
          "resize_keyboard": true,
          "keyboard": [
            [
              {
                "text": BotKeys.sixHours
              }, 
              {
                "text": BotKeys.threeHours
              }
            ]
          ]
        }
      });
      return;
  }

  if (msg.text?.toString().toLowerCase().indexOf(sixHours) === 0) {
    const data: Response | undefined = await getWeatherData(weather_api_url);
    if(typeof data === 'undefined') {
      bot.sendMessage(msg.chat.id, 'No connection to the weather API');
    } else {
      const dataArr = dataPrettier(data);
      const response = onlySixHoursForecast(dataArr);
    bot.sendMessage(msg.chat.id, response);
    return;
    }
  }

  if (msg.text?.toString().toLowerCase().indexOf(threeHours) === 0) {
    const data: Response | undefined = await getWeatherData(weather_api_url);
    if(typeof data === 'undefined') {
      bot.sendMessage(msg.chat.id, 'No connection to the weather API');
    } else {
      const dataArr = dataPrettier(data);
      const response = onlyThreeHoursForecast(dataArr);
    bot.sendMessage(msg.chat.id, response);
    return;
    }
  }

  bot.sendMessage(msg.chat.id, "Please input or push /start for starting a bot");

});