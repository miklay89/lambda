"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function coinBaseResponseDataHandler(data) {
    const cryptocurrencyPlatformName = "Coinbase";
    const response = {
        cryptocurrencyPlatformName,
        data: [],
    };
    data.forEach((element) => {
        const cryptoCurrencySymbol = element.data.base;
        let cryptoCurrencyPrice = +element.data.amount;
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
exports.default = coinBaseResponseDataHandler;
