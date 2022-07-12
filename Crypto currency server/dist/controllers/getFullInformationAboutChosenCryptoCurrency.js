"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const cryptoSymbols_1 = __importDefault(require("../requestQueryData/cryptoSymbols"));
const cryptoMarkets_1 = __importDefault(require("../requestQueryData/cryptoMarkets"));
const getFullInformationAboutChosenCryptoCurrency = async (req, res) => {
    const cryptoSymbol = req.query.cryptoSymbol;
    const market = req.query.market;
    const period = req.query.period;
    const cryptoSymbolCandidate = cryptoSymbols_1.default.find((storedSymbol) => storedSymbol === cryptoSymbol);
    if (!cryptoSymbolCandidate) {
        res.json({
            message: `Crypto symbol incorrect, please use one from list: ${cryptoSymbols_1.default}`,
        });
        return;
    }
    const cryptoMarketCandidate = cryptoMarkets_1.default.find((storedMarket) => storedMarket === market);
    if (!cryptoMarketCandidate) {
        res.json({
            message: `Crypto market incorrect, please use one from list: ${cryptoMarkets_1.default}`,
        });
        return;
    }
    if (period) {
        const data = (await (0, database_1.readFromDB)(cryptoSymbol, market, +period));
        if (!data) {
            res.json("No data founded in DB");
            return;
        }
        const responseMessage = {
            cryptoSymbol,
            market,
            average_price: data[0][`AVG(a.${market})`],
            period: `${period} ms`,
        };
        res.json(responseMessage);
        return;
    }
    const data = (await (0, database_1.readFromDB)(cryptoSymbol, market));
    if (!data) {
        res.json("No data founded in DB");
        return;
    }
    const responseMessage = {
        cryptoSymbol,
        market,
        last_price: data[0][`${market}`],
        period: "not set",
    };
    res.json(responseMessage);
};
exports.default = getFullInformationAboutChosenCryptoCurrency;
