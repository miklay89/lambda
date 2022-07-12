"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cryptoIds_1 = __importDefault(require("../requestQueryData/cryptoIds"));
function coinPapricaResponseDataHandler(data) {
    const cryptocurrencyPlatformName = "CoinPaprica";
    const response = {
        cryptocurrencyPlatformName,
        data: [],
    };
    const filteredDataArr = data.filter(({ id }) => cryptoIds_1.default.includes(id));
    filteredDataArr.forEach((element) => {
        const cryptoCurrencySymbol = element.symbol;
        let cryptoCurrencyPrice = +element.quotes.USD.price;
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
exports.default = coinPapricaResponseDataHandler;
