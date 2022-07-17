"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromFavouriteList = exports.saveToFavouriteList = exports.checkInFavouriteList = exports.getFavouriteListCryptoCurrency = exports.getFavouriteListFromDB = exports.updateFollowingState = exports.checkIsFollowingFromDB = exports.getListRecent = exports.getAveragePriceByTimeInterval = exports.getLastPrice = exports.saveToDataBase = void 0;
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
exports.getAveragePriceByTimeInterval = getAveragePriceByTimeInterval;
async function getListRecent() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT crypto_currency_symbol, average_price FROM crypto_currency_price order by Timestamp desc limit 20;`, (error, result) => {
            if (error)
                reject(error);
            resolve(result);
        });
    });
}
exports.getListRecent = getListRecent;
async function checkIsFollowingFromDB(userId, cryptoSymbol) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT user_id, options FROM follow_list WHERE user_id="${userId}" AND options="${cryptoSymbol}";`, (error, result) => {
            if (error)
                reject(error);
            if (result.length === 0) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
}
exports.checkIsFollowingFromDB = checkIsFollowingFromDB;
async function updateFollowingState(userId, cryptoSymbol, isFollowing) {
    return new Promise((resolve, reject) => {
        if (isFollowing) {
            connection.query(`DELETE FROM follow_list WHERE user_id="${userId}";`, (error) => {
                if (error)
                    reject(error);
            });
            resolve(true);
            return;
        }
        connection.query(`INSERT INTO follow_list (user_id, options) VALUES ("${userId}","${cryptoSymbol}");`, (error) => {
            if (error)
                reject(error);
        });
        resolve(true);
    });
}
exports.updateFollowingState = updateFollowingState;
async function getFavouriteListFromDB(userId) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT user_id, options FROM favourite_list WHERE user_id="${userId}";`, (error, result) => {
            if (error)
                reject(error);
            if (result.length === 0) {
                resolve("");
                return;
            }
            const favouriteListArr = result.map(({ options }) => options);
            let favouriteQueryString = ``;
            favouriteListArr.forEach((el, index) => {
                favouriteQueryString += `"${el}",`;
                if (index === favouriteListArr.length - 1)
                    favouriteQueryString = favouriteQueryString.slice(0, favouriteQueryString.length - 1);
            });
            resolve(favouriteQueryString);
        });
    });
}
exports.getFavouriteListFromDB = getFavouriteListFromDB;
async function getFavouriteListCryptoCurrency(queryString) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT a.crypto_currency_symbol, a.average_price FROM
          (SELECT * FROM crypto_currency_price order by Timestamp desc limit 20) a WHERE
          crypto_currency_symbol in (${queryString});`, (error, result) => {
            if (error)
                reject(error);
            resolve(result);
        });
    });
}
exports.getFavouriteListCryptoCurrency = getFavouriteListCryptoCurrency;
async function checkInFavouriteList(userId, cryptoSymbol) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT user_id, options FROM favourite_list WHERE user_id="${userId}" AND options="${cryptoSymbol}";`, (error, result) => {
            if (error)
                reject(error);
            if (result.length === 0) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
}
exports.checkInFavouriteList = checkInFavouriteList;
async function saveToFavouriteList(userId, cryptoSymbol) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO favourite_list (user_id, options) VALUES ("${userId}","${cryptoSymbol}");`, (error) => {
            if (error)
                reject(error);
        });
        resolve(true);
    });
}
exports.saveToFavouriteList = saveToFavouriteList;
async function deleteFromFavouriteList(userId, cryptoSymbol) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM favourite_list WHERE user_id="${userId}" AND options="${cryptoSymbol}";`, (error) => {
            if (error)
                reject(error);
        });
        resolve(true);
    });
}
exports.deleteFromFavouriteList = deleteFromFavouriteList;
