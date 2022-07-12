"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFromDB = exports.getLastPrice = exports.saveToDataBase = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mysql2_1 = __importDefault(require("mysql2"));
const cryptoSymbols_1 = __importDefault(require("./requestQueryData/cryptoSymbols"));
dotenv_1.default.config();
const dataBaseUrl = process.env.DATABASE_URL;
const connection = mysql2_1.default.createConnection(dataBaseUrl);
function valueOfCryptoCurrencyPriceByPlatform(data, cryptoPlatformName, cryptoSymbol) {
    const filteredDataByPlatformName = data.find((item) => item.cryptocurrencyPlatformName === cryptoPlatformName);
    if (!filteredDataByPlatformName)
        return 0;
    const cryptoPricesData = filteredDataByPlatformName.data;
    let price = 0;
    cryptoPricesData.find((item) => {
        if (item.cryptoCurrencySymbol === cryptoSymbol) {
            price = item.cryptoCurrencyPrice;
        }
    });
    return price;
}
function averagePrice(one, two, three, four, five) {
    let average = 0;
    average = (one + two + three + four + five) / 5;
    return average;
}
async function saveToDataBase(data, timeStamp) {
    try {
        cryptoSymbols_1.default.forEach((cryptoCurrencySymbol) => {
            connection.query("INSERT INTO crypto_currency_price (crypto_currency_symbol, KuCoin, Coinbase, CoinMarketCap, CoinPaprica, CoinStats, average_price, Timestamp) VALUES (?,?,?,?,?,?,?,?)", [
                cryptoCurrencySymbol,
                valueOfCryptoCurrencyPriceByPlatform(data, "KuCoin", cryptoCurrencySymbol),
                valueOfCryptoCurrencyPriceByPlatform(data, "Coinbase", cryptoCurrencySymbol),
                valueOfCryptoCurrencyPriceByPlatform(data, "CoinMarketCap", cryptoCurrencySymbol),
                valueOfCryptoCurrencyPriceByPlatform(data, "CoinPaprica", cryptoCurrencySymbol),
                valueOfCryptoCurrencyPriceByPlatform(data, "CoinStats", cryptoCurrencySymbol),
                averagePrice(valueOfCryptoCurrencyPriceByPlatform(data, "KuCoin", cryptoCurrencySymbol), valueOfCryptoCurrencyPriceByPlatform(data, "Coinbase", cryptoCurrencySymbol), valueOfCryptoCurrencyPriceByPlatform(data, "CoinMarketCap", cryptoCurrencySymbol), valueOfCryptoCurrencyPriceByPlatform(data, "CoinPaprica", cryptoCurrencySymbol), valueOfCryptoCurrencyPriceByPlatform(data, "CoinStats", cryptoCurrencySymbol)),
                timeStamp,
            ], (error) => {
                if (error)
                    console.log(error);
            });
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.saveToDataBase = saveToDataBase;
async function getLastPrice(cryptoCurrencySymbol, cryptoMarket) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT a.${cryptoMarket} FROM 
      (SELECT crypto_currency_symbol, ${cryptoMarket} FROM 
      crypto_currency_price order by Timestamp desc limit 20) a 
      WHERE a.crypto_currency_symbol="${cryptoCurrencySymbol}";`, (error, result) => {
            if (error)
                reject(error);
            resolve(result);
        });
    });
}
exports.getLastPrice = getLastPrice;
async function getAveragePriceByTimeInterval(cryptoCurrencySymbol, cryptoMarket, timeInterval) {
    return new Promise((resolve, reject) => {
        const currentDate = new Date();
        const queryDateWithTimeInterval = currentDate.getTime() - timeInterval;
        const timeStamp = new Date(queryDateWithTimeInterval);
        const sqlTimestamp = timeStamp.toISOString().slice(0, 19).replace("T", " ");
        connection.query(`SELECT AVG(a.${cryptoMarket}) FROM 
      (SELECT crypto_currency_symbol, ${cryptoMarket}, Timestamp FROM 
      crypto_currency_price WHERE crypto_currency_symbol="${cryptoCurrencySymbol}" AND 
      Timestamp > "${sqlTimestamp}" ORDER BY Timestamp) a;`, (error, result) => {
            if (error)
                reject(error);
            resolve(result);
        });
    });
}
async function readFromDB(cryptoCurrencySymbol, cryptoMarket, timeInterval) {
    try {
        if (timeInterval) {
            const priceByInterval = await getAveragePriceByTimeInterval(cryptoCurrencySymbol, cryptoMarket, timeInterval);
            return priceByInterval;
        }
        const lastPrice = await getLastPrice(cryptoCurrencySymbol, cryptoMarket);
        return lastPrice;
    }
    catch (error) {
        console.log(error);
    }
    return null;
}
exports.readFromDB = readFromDB;
