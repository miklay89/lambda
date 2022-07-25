"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullInfoDataHandler = exports.recentListDataHandler = exports.favouriteListDataHandler = void 0;
function trimPrice(price) {
    if (price > 0.1) {
        return price.toFixed(3);
    }
    return price.toFixed(9);
}
function favouriteListDataHandler(data) {
    const newLine = "\n";
    if (!(data === null || data === void 0 ? void 0 : data.data)) {
        const dataMessage = data.message;
        const message = `${dataMessage}:`;
        return message;
    }
    let message = data.message;
    message = `${message}:`;
    const sortedPricesByCrypoSymbolName = data.data.sort((a, b) => a.crypto_currency_symbol.localeCompare(b.crypto_currency_symbol));
    sortedPricesByCrypoSymbolName.forEach((element) => {
        const cryptoSymbol = element.crypto_currency_symbol;
        const price = trimPrice(+element.average_price);
        const line = `${newLine}/${cryptoSymbol} - ${price} $`;
        message += line;
    });
    return message;
}
exports.favouriteListDataHandler = favouriteListDataHandler;
function recentListDataHandler(data) {
    const newLine = "\n";
    let message = data.message;
    message = `${message}:`;
    const sortedPricesByCrypoSymbolName = data.prices.sort((a, b) => a.crypto_currency_symbol.localeCompare(b.crypto_currency_symbol));
    sortedPricesByCrypoSymbolName.forEach((element) => {
        const cryptoSymbol = element.crypto_currency_symbol;
        const price = trimPrice(+element.average_price);
        const line = `${newLine}/${cryptoSymbol} - ${price} $`;
        message += line;
    });
    return message;
}
exports.recentListDataHandler = recentListDataHandler;
function findPriceByTime(data, period) {
    let price;
    data.filter((element) => {
        if (element.period === period) {
            price = trimPrice(+element.average_price.toString());
        }
    });
    return price;
}
function fullInfoDataHandler(data) {
    const newLine = "\n";
    const { isFollowing } = data[0];
    const message = `Full information about cryptocurrency - ${data[0].cryptoSymbol}:`;
    const price24H = `${newLine}24 hours average price - ${findPriceByTime(data, "86400000 ms")} $`;
    const price12H = `${newLine}12 hours average price - ${findPriceByTime(data, "43200000 ms")} $`;
    const price6H = `${newLine}6 hours average price - ${findPriceByTime(data, "21600000 ms")} $`;
    const price3H = `${newLine}3 hours average price - ${findPriceByTime(data, "10800000 ms")} $`;
    const price1H = `${newLine}1 hour average price - ${findPriceByTime(data, "3600000 ms")} $`;
    const price30m = `${newLine}30 minutes average price - ${findPriceByTime(data, "1800000 ms")} $`;
    const resultMessage = message + price24H + price12H + price6H + price3H + price1H + price30m;
    const response = {
        message: resultMessage,
        isFollowing,
    };
    return response;
}
exports.fullInfoDataHandler = fullInfoDataHandler;
