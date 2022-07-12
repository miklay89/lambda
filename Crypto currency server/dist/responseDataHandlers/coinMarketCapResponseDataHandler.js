"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function coinMarketCapResponseDataHandler(data) {
    const cryptocurrencyPlatformName = "CoinMarketCap";
    const response = {
        cryptocurrencyPlatformName,
        data: [],
    };
    const mappedArr = Object.entries(data).map((item) => {
        const cryptoCurrencySymbol = item[1].symbol;
        let cryptoCurrencyPrice = +item[1].quote.USD.price;
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
        return currencyData;
    });
    response.data.push(...mappedArr);
    return response;
}
exports.default = coinMarketCapResponseDataHandler;
