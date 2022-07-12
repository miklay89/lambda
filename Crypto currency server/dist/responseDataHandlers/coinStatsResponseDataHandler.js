"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function coinStatsResponseDataHandler(data) {
    const cryptocurrencyPlatformName = "CoinStats";
    const response = {
        cryptocurrencyPlatformName,
        data: [],
    };
    data.forEach((element) => {
        const cryptoCurrencySymbol = element.coin.symbol;
        let cryptoCurrencyPrice = +element.coin.price;
        if (cryptoCurrencyPrice < 0.1) {
            cryptoCurrencyPrice = +cryptoCurrencyPrice.toFixed(8);
        }
        else {
            cryptoCurrencyPrice = +cryptoCurrencyPrice.toFixed(3);
        }
        const currencyData = {
            cryptoCurrencySymbol,
            cryptoCurrencyPrice,
        };
        response.data.push(currencyData);
    });
    return response;
}
exports.default = coinStatsResponseDataHandler;
