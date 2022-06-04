"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NTBA_FIX_319 = '1';
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const keys_1 = __importDefault(require("./keys/keys"));
const getDataFromAPI_1 = __importDefault(require("./helpers/getDataFromAPI"));
const dataHandler_1 = __importDefault(require("./helpers/dataHandler"));
const dataHandler_2 = require("./helpers/dataHandler");
const weather_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${keys_1.default.coordinates.lat}&lon=${keys_1.default.coordinates.lon}&appid=${keys_1.default.WEATHER_API_KEY}&units=metric`;
var BotKeys;
(function (BotKeys) {
    BotKeys["threeHours"] = "3 hours forecast";
    BotKeys["sixHours"] = "6 hours forecast";
})(BotKeys || (BotKeys = {}));
const bot = new node_telegram_bot_api_1.default(keys_1.default.TELEGRAMBOT_TOKEN, { polling: true });
bot.on('message', async (msg) => {
    var _a, _b, _c;
    const start = "/start";
    const sixHours = BotKeys.sixHours;
    const threeHours = BotKeys.threeHours;
    if (((_a = msg.text) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().indexOf(start)) === 0) {
        bot.sendMessage(msg.chat.id, "Welcome to forecast weather bot in Madrid, please select hourly forecast options from keyboard", {
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
    if (((_b = msg.text) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase().indexOf(sixHours)) === 0) {
        const data = await (0, getDataFromAPI_1.default)(weather_api_url);
        if (typeof data === 'undefined') {
            bot.sendMessage(msg.chat.id, 'No connection to the weather API');
        }
        else {
            const dataArr = (0, dataHandler_1.default)(data);
            const response = (0, dataHandler_2.onlySixHoursForecast)(dataArr);
            bot.sendMessage(msg.chat.id, response);
            return;
        }
    }
    if (((_c = msg.text) === null || _c === void 0 ? void 0 : _c.toString().toLowerCase().indexOf(threeHours)) === 0) {
        const data = await (0, getDataFromAPI_1.default)(weather_api_url);
        if (typeof data === 'undefined') {
            bot.sendMessage(msg.chat.id, 'No connection to the weather API');
        }
        else {
            const dataArr = (0, dataHandler_1.default)(data);
            const response = (0, dataHandler_2.onlyThreeHoursForecast)(dataArr);
            bot.sendMessage(msg.chat.id, response);
            return;
        }
    }
    bot.sendMessage(msg.chat.id, "Please input or push /start for starting a bot");
});
