"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NTBA_FIX_319 = '1';
const dotenv_1 = __importDefault(require("dotenv"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const getDataFromAPI_1 = __importDefault(require("./helpers/getDataFromAPI"));
const weatherDataHandler_1 = __importDefault(require("./helpers/weatherDataHandler"));
const weatherDataHandler_2 = require("./helpers/weatherDataHandler");
const privatBankDataHandler_1 = require("./helpers/privatBankDataHandler");
const monoBankDataHandler_1 = require("./helpers/monoBankDataHandler");
const db_1 = require("./db/db");
dotenv_1.default.config();
const weather_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${process.env.LATITUDE}&lon=${process.env.LONGTITUDE}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
const privatBankUrl = process.env.PRIVAT_BANK_API_URL;
const monoBankUrl = process.env.MONOBANK_API_URL;
var BotKeys;
(function (BotKeys) {
    BotKeys["threeHours"] = "3 hours forecast";
    BotKeys["sixHours"] = "6 hours forecast";
    BotKeys["privat_bank"] = "privatbank currency courses";
    BotKeys["monobank"] = "monobank currency courses";
})(BotKeys || (BotKeys = {}));
const bot = new node_telegram_bot_api_1.default(process.env.BOT_TOKEN, { polling: true });
bot.on('message', async (msg) => {
    var _a, _b, _c, _d, _e;
    const start = "/start";
    const sixHours = BotKeys.sixHours;
    const threeHours = BotKeys.threeHours;
    const privat_bank = BotKeys.privat_bank;
    const monobank = BotKeys.monobank;
    if (((_a = msg.text) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().indexOf(start)) === 0) {
        bot.sendMessage(msg.chat.id, "Welcome to weather/currency bot, please select options from keyboard. Forecast are provided for Madrid and currency courses for Privat Bank and Mono Bank.", {
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
    if (((_b = msg.text) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase().indexOf(sixHours)) === 0) {
        const data = await (0, getDataFromAPI_1.default)(weather_api_url);
        if (typeof data === 'undefined') {
            bot.sendMessage(msg.chat.id, 'No connection to the weather API');
            return;
        }
        const dataArr = (0, weatherDataHandler_1.default)(data);
        const response = (0, weatherDataHandler_2.onlySixHoursForecast)(dataArr);
        bot.sendMessage(msg.chat.id, response);
        return;
    }
    if (((_c = msg.text) === null || _c === void 0 ? void 0 : _c.toString().toLowerCase().indexOf(threeHours)) === 0) {
        const data = await (0, getDataFromAPI_1.default)(weather_api_url);
        if (typeof data === 'undefined') {
            bot.sendMessage(msg.chat.id, 'No connection to the weather API');
            return;
        }
        const dataArr = (0, weatherDataHandler_1.default)(data);
        const response = (0, weatherDataHandler_2.onlyThreeHoursForecast)(dataArr);
        bot.sendMessage(msg.chat.id, response);
        return;
    }
    if (((_d = msg.text) === null || _d === void 0 ? void 0 : _d.toString().toLowerCase().indexOf(privat_bank)) === 0) {
        const data = await (0, getDataFromAPI_1.default)(privatBankUrl);
        if (typeof data === 'undefined') {
            bot.sendMessage(msg.chat.id, 'No connection to Privat Bank currency API');
            return;
        }
        const dataArr = (0, privatBankDataHandler_1.filterDataPrivat)(data);
        const response = (0, privatBankDataHandler_1.responseHandlerPrivat)(dataArr);
        bot.sendMessage(msg.chat.id, response);
        return;
    }
    if (((_e = msg.text) === null || _e === void 0 ? void 0 : _e.toString().toLowerCase().indexOf(monobank)) === 0) {
        const data = await (0, getDataFromAPI_1.default)(monoBankUrl);
        if (typeof data === 'undefined') {
            const response = await (0, db_1.readFromDb)();
            if (typeof response === 'undefined') {
                bot.sendMessage(msg.chat.id, 'No connection to Mono Bank currency API');
                return;
            }
            bot.sendMessage(msg.chat.id, response);
            return;
        }
        const dataArr = (0, monoBankDataHandler_1.filterDataMono)(data);
        const response = (0, monoBankDataHandler_1.responseHandlerMono)(dataArr);
        await (0, db_1.saveToDB)(response);
        bot.sendMessage(msg.chat.id, response);
        return;
    }
    bot.sendMessage(msg.chat.id, `Please input or push /start for starting a bot`);
});
