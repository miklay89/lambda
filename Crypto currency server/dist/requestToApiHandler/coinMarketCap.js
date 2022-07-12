"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromCoinMarketCap = exports.generateCoinMarketCapUrl = void 0;
const axios_1 = __importDefault(require("axios"));
function generateCoinMarketCapUrl(baseUrl, arrCryptoSymbols) {
    return baseUrl + arrCryptoSymbols.join(",");
}
exports.generateCoinMarketCapUrl = generateCoinMarketCapUrl;
async function getDataFromCoinMarketCap(url, apiKeyHeaderName, apiKey) {
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                [apiKeyHeaderName]: apiKey,
            },
        });
        if (response.status === 200) {
            return response.data.data;
        }
    }
    catch (err) {
        console.log(err);
    }
    return null;
}
exports.getDataFromCoinMarketCap = getDataFromCoinMarketCap;
