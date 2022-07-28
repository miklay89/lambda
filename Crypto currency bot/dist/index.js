"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NTBA_FIX_319 = "1";
const dotenv_1 = __importDefault(require("dotenv"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const cryptoSymbols_1 = __importDefault(require("./requestQueryData/cryptoSymbols"));
const addToFavouriteList_1 = __importDefault(require("./controllers/addToFavouriteList"));
const deleteFromFavouriteList_1 = __importDefault(require("./controllers/deleteFromFavouriteList"));
const getFavouriteList_1 = __importDefault(require("./controllers/getFavouriteList"));
const getFullInformationAboutChosenCryptoCurrency_1 = require("./controllers/getFullInformationAboutChosenCryptoCurrency");
const getListRecent_1 = __importDefault(require("./controllers/getListRecent"));
const wakeUpWorker_1 = __importDefault(require("./helpers/wakeUpWorker"));
dotenv_1.default.config();
const awake = wakeUpWorker_1.default;
const newLine = "\n";
var BotMessages;
(function (BotMessages) {
    BotMessages["addToFavouriteListText"] = "/addToFavourite";
    BotMessages["deleteFromFavouriteListText"] = "/deleteFavourite";
    BotMessages["getFavouriteListText"] = "/listFavourite";
    BotMessages["getFullInformationAboutChosenCryptoCurrencyText"] = "/{cryptoSymbol}";
    BotMessages["getRecentListText"] = "/listRecent";
    BotMessages["helpText"] = "/help";
    BotMessages["startText"] = "/start";
})(BotMessages || (BotMessages = {}));
const bot = new node_telegram_bot_api_1.default(process.env.BOT_TOKEN, { polling: true });
bot.on("message", async (msg) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    if (((_a = msg.text) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().indexOf(BotMessages.startText)) === 0) {
        bot.sendMessage(msg.chat.id, `Welcome to crypto currency commutator bot. You can get list of commands using help command - ${BotMessages.helpText}`);
        return;
    }
    if (((_b = msg.text) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase().indexOf(BotMessages.helpText)) === 0) {
        bot.sendMessage(msg.chat.id, `- ${BotMessages.startText} - returns start message,
- ${BotMessages.helpText} - returns information about commands,
- ${BotMessages.getRecentListText} - returns recent list about all crypto currencys,
- ${BotMessages.getFullInformationAboutChosenCryptoCurrencyText}* - returns full information about chosen crypto currency (example - /BTC),
- ${BotMessages.addToFavouriteListText} {crypto_symbol}* - adds chosen crypto currency to favourite list (example - /addToFavourite BTC),
- ${BotMessages.getFavouriteListText} - returns list of favourite crypto currencys,
- ${BotMessages.deleteFromFavouriteListText} {crypto_symbol}* - removes chosen crypto currency from favourite list (example - /deleteFavourite BTC),${newLine}
*List of crypto symbols:
${cryptoSymbols_1.default}`);
        return;
    }
    if (((_c = msg.text) === null || _c === void 0 ? void 0 : _c.toString().split(" ")[0]) === BotMessages.addToFavouriteListText) {
        if (msg.text.toString().split(" ").length < 2) {
            bot.sendMessage(msg.chat.id, `Please chose one crypto symbol from list and input it like - ${newLine}${BotMessages.addToFavouriteListText} {crypto_symbol}*,${newLine}list of crypto symbols: ${cryptoSymbols_1.default}`);
            return;
        }
        const userId = (_d = msg.from) === null || _d === void 0 ? void 0 : _d.id;
        const cryptoSymbol = msg.text.toString().split(" ")[1];
        if (cryptoSymbols_1.default.includes(cryptoSymbol) &&
            userId &&
            cryptoSymbol !== null) {
            const message = await (0, addToFavouriteList_1.default)(userId, cryptoSymbol);
            if (!message) {
                bot.sendMessage(msg.chat.id, "No conection to server, please try again later.");
                return;
            }
            bot.sendMessage(msg.chat.id, message);
            return;
        }
        bot.sendMessage(msg.chat.id, `Please chose one crypto symbol from list and input it like - ${newLine}${BotMessages.addToFavouriteListText} {crypto_symbol}*,${newLine}list of crypto symbols: ${cryptoSymbols_1.default}`);
        return;
    }
    if (((_e = msg.text) === null || _e === void 0 ? void 0 : _e.toString().split(" ")[0]) ===
        BotMessages.deleteFromFavouriteListText) {
        if (msg.text.toString().split(" ").length < 2) {
            bot.sendMessage(msg.chat.id, `Please chose one crypto symbol from list and input it like - ${newLine}${BotMessages.deleteFromFavouriteListText} {crypto_symbol}*,${newLine}list of crypto symbols: ${cryptoSymbols_1.default}`);
            return;
        }
        const userId = (_f = msg.from) === null || _f === void 0 ? void 0 : _f.id;
        const cryptoSymbol = (_g = msg.text) === null || _g === void 0 ? void 0 : _g.toString().split(" ")[1];
        if (cryptoSymbols_1.default.includes(cryptoSymbol) &&
            userId &&
            cryptoSymbol !== null) {
            const message = await (0, deleteFromFavouriteList_1.default)(userId, cryptoSymbol);
            if (!message) {
                bot.sendMessage(msg.chat.id, "No conection to server, please try again later.");
                return;
            }
            bot.sendMessage(msg.chat.id, message);
            return;
        }
        bot.sendMessage(msg.chat.id, `Please chose one crypto symbol from list and input it like - ${newLine}${BotMessages.deleteFromFavouriteListText} {crypto_symbol}*,${newLine}list of crypto symbols: ${cryptoSymbols_1.default}`);
        return;
    }
    if (((_h = msg.text) === null || _h === void 0 ? void 0 : _h.toString().indexOf(BotMessages.getFavouriteListText)) === 0) {
        const userId = (_j = msg.from) === null || _j === void 0 ? void 0 : _j.id;
        if (userId) {
            const message = await (0, getFavouriteList_1.default)(userId);
            if (!message) {
                bot.sendMessage(msg.chat.id, "No conection to server, please try again later.");
                return;
            }
            bot.sendMessage(msg.chat.id, message);
            return;
        }
    }
    if (cryptoSymbols_1.default.includes((_k = msg.text) === null || _k === void 0 ? void 0 : _k.toString().slice(1)) &&
        ((_l = msg.text) === null || _l === void 0 ? void 0 : _l.toString().slice(1)) !== null) {
        const cryptoSymbol = (_m = msg.text) === null || _m === void 0 ? void 0 : _m.toString().slice(1);
        const userId = (_o = msg.from) === null || _o === void 0 ? void 0 : _o.id;
        if (userId && cryptoSymbol && cryptoSymbol !== null) {
            const message = await (0, getFullInformationAboutChosenCryptoCurrency_1.getFullInfo)(userId, cryptoSymbol);
            if (!message) {
                bot.sendMessage(msg.chat.id, "No conection to server, please try again later.");
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
    if (((_p = msg.text) === null || _p === void 0 ? void 0 : _p.toString().indexOf(BotMessages.getRecentListText)) === 0) {
        const message = await (0, getListRecent_1.default)();
        if (!message) {
            bot.sendMessage(msg.chat.id, "No conection to server, please try again later.");
            return;
        }
        bot.sendMessage(msg.chat.id, message);
        return;
    }
    bot.sendMessage(msg.chat.id, `Your input incorect, please input or push ${BotMessages.startText}  for starting a bot,
or use ${BotMessages.helpText} for view list of bot commands`);
});
bot.on("callback_query", async (text) => {
    var _a, _b, _c;
    if (text.data === "switchFollowingState") {
        const userId = text.from.id;
        if (!((_a = text.message) === null || _a === void 0 ? void 0 : _a.text)) {
            return;
        }
        const cryptoSymbolString = (_b = text.message) === null || _b === void 0 ? void 0 : _b.text.toString().split(":")[0].split("-");
        const cryptoSymbol = cryptoSymbolString[1].slice(1, cryptoSymbolString[1].length);
        const chatId = (_c = text.message) === null || _c === void 0 ? void 0 : _c.chat.id;
        const data = await (0, getFullInformationAboutChosenCryptoCurrency_1.switchFollowingState)(userId, cryptoSymbol);
        if (!data) {
            bot.sendMessage(chatId, "No conection to server, please try again later.");
            return;
        }
        const message = `Following state was changed, use /${cryptoSymbol} command to see it.`;
        bot.answerCallbackQuery(text.id);
        bot.sendMessage(chatId, message);
    }
});
