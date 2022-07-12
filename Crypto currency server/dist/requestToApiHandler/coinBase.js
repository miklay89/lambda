"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromCoinBase = exports.generateCoinBaseUrls = void 0;
const axios_1 = __importDefault(require("axios"));
function generateCoinBaseUrls(baseUrl, cryptoSymbols, urlEnding) {
    const generatedUrls = [];
    cryptoSymbols.forEach((element) => {
        const generatedUrl = baseUrl + element + urlEnding;
        generatedUrls.push(generatedUrl);
    });
    return generatedUrls;
}
exports.generateCoinBaseUrls = generateCoinBaseUrls;
async function getDataFromCoinBase(urlsArray) {
    try {
        const promises = urlsArray.map(async (url) => {
            const response = await axios_1.default.get(url);
            if (response.status === 200) {
                return response.data;
            }
            return null;
        });
        const resultResponse = Promise.all([...promises]).then((result) => {
            return result;
        });
        return resultResponse;
    }
    catch (err) {
        console.log(err);
    }
    return null;
}
exports.getDataFromCoinBase = getDataFromCoinBase;
