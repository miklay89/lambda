process.env.NTBA_FIX_319 = '1';
import dotenv from 'dotenv'
import TelegramBot from 'node-telegram-bot-api';
import getData from './helpers/getDataFromAPI';
import weatherDataPrettier from './helpers/weatherDataHandler';
import { onlyThreeHoursForecast, onlySixHoursForecast } from './helpers/weatherDataHandler';
import ResponseWeatherApi from './helpers/responseWeatherApiInterface';
import { ResponseMonoBankApi, ResponsePrivatBankApi } from "./helpers/responseBankApiInterface";
import { filterDataPrivat, responseHandlerPrivat } from "./helpers/privatBankDataHandler";
import { filterDataMono, responseHandlerMono } from "./helpers/monoBankDataHandler";
import { saveToDB, readFromDb } from './db/db';
dotenv.config()

// https://openweathermap.org/forecast5
const weather_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${process.env.LATITUDE}&lon=${process.env.LONGTITUDE}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
const privatBankUrl = process.env.PRIVAT_BANK_API_URL as string;
const monoBankUrl = process.env.MONOBANK_API_URL as string;

enum BotKeys {
  threeHours = "3 hours forecast",
  sixHours = "6 hours forecast",
  privat_bank = "privatbank currency courses",
  monobank = "monobank currency courses"
}

const bot = new TelegramBot(process.env.BOT_TOKEN as string, {polling: true});

bot.on('message', async (msg) => {
  const start = "/start";
  const sixHours = BotKeys.sixHours;
  const threeHours = BotKeys.threeHours;
  const privat_bank = BotKeys.privat_bank;
  const monobank = BotKeys.monobank;

  // logic answer for '/start' message
  if (msg.text?.toString().toLowerCase().indexOf(start) === 0) {
    
    bot.sendMessage(
      msg.chat.id, 
      "Welcome to weather/currency bot, please select options from keyboard. Forecast are provided for Madrid and currency courses for Privat Bank and Mono Bank.", 
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
            ],
            [
              {
                "text": BotKeys.privat_bank
              }, 
              {
                "text": BotKeys.monobank
              }
            ]
          ]
        }
      });
    return;
  }

  // forecast bot logic
  // SIX HOURS FORECAST
  if (msg.text?.toString().toLowerCase().indexOf(sixHours) === 0) {
    const data: ResponseWeatherApi | undefined = await getData(weather_api_url) as ResponseWeatherApi;
    if(typeof data === 'undefined') {
      bot.sendMessage(msg.chat.id, 'No connection to the weather API');
      return;
    } 

    const dataArr = weatherDataPrettier(data);
    const response = onlySixHoursForecast(dataArr);
    bot.sendMessage(msg.chat.id, response);
    return;
  }

  // THREE HOURS FORECAST
  if (msg.text?.toString().toLowerCase().indexOf(threeHours) === 0) {
    const data: ResponseWeatherApi | undefined = await getData(weather_api_url) as ResponseWeatherApi;
    if(typeof data === 'undefined') {
      bot.sendMessage(msg.chat.id, 'No connection to the weather API');
      return;
    } 

    const dataArr = weatherDataPrettier(data);
    const response = onlyThreeHoursForecast(dataArr);
    bot.sendMessage(msg.chat.id, response);
    return;
  }

  // currency bot logic
  // PRIVAT BANK
  if (msg.text?.toString().toLowerCase().indexOf(privat_bank) === 0) {
    const data: ResponsePrivatBankApi | undefined = await getData(privatBankUrl) as ResponsePrivatBankApi;
    if(typeof data === 'undefined') {
      bot.sendMessage(msg.chat.id, 'No connection to Privat Bank currency API');
      return;
    } 

    const dataArr = filterDataPrivat(data);
    const response = responseHandlerPrivat(dataArr);
    bot.sendMessage(msg.chat.id, response);
    return; 
  }

  // MONO BANK
  if (msg.text?.toString().toLowerCase().indexOf(monobank) === 0) {
    const data: ResponseMonoBankApi | undefined = await getData(monoBankUrl) as ResponseMonoBankApi;
    if(typeof data === 'undefined') {
      const response = await readFromDb();
      if(typeof response === 'undefined') {
        bot.sendMessage(msg.chat.id, 'No connection to Mono Bank currency API');
        return;
      }
      bot.sendMessage(msg.chat.id, response);
      return;
    } 

    const dataArr = filterDataMono(data);
    const response = responseHandlerMono(dataArr);
    await saveToDB(response)
    bot.sendMessage(msg.chat.id, response);
    return;
  }

  // any message handler
  bot.sendMessage(msg.chat.id, `Please input or push /start for starting a bot`);

});