"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromKuCoin = exports.generateKuCoinUrl = void 0;
const axios_1 = __importDefault(require("axios"));
function generateKuCoinUrl(baseUrl, arrCryptoSymbols) {
    return baseUrl + arrCryptoSymbols.join(",");
}
exports.generateKuCoinUrl = generateKuCoinUrl;
async function getDataFromKuCoin(url) {
    try {
        const response = await axios_1.default.get(url);
        if (response.status === 200) {
            return response.data;
        }
    }
    catch (err) {
        console.log(err);
    }
    return null;
}
exports.getDataFromKuCoin = getDataFromKuCoin;
