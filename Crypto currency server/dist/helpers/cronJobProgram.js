"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const cryptoSymbols_1 = __importDefault(require("../requestQueryData/cryptoSymbols"));
const cryptoNames_1 = __importDefault(require("../requestQueryData/cryptoNames"));
const kuCoin_1 = require("../requestToApiHandler/kuCoin");
const kuCoinResponseDataHandler_1 = __importDefault(require("../responseDataHandlers/kuCoinResponseDataHandler"));
const coinMarketCap_1 = require("../requestToApiHandler/coinMarketCap");
const coinMarketCapResponseDataHandler_1 = __importDefault(require("../responseDataHandlers/coinMarketCapResponseDataHandler"));
const coinBase_1 = require("../requestToApiHandler/coinBase");
const coinBaseResponseDataHandler_1 = __importDefault(require("../responseDataHandlers/coinBaseResponseDataHandler"));
const coinStats_1 = require("../requestToApiHandler/coinStats");
const coinPaprica_1 = __importDefault(require("../requestToApiHandler/coinPaprica"));
const coinStatsResponseDataHandler_1 = __importDefault(require("../responseDataHandlers/coinStatsResponseDataHandler"));
const coinPapricaResponseDataHandler_1 = __importDefault(require("../responseDataHandlers/coinPapricaResponseDataHandler"));
const database_1 = require("../database");
dotenv_1.default.config();
async function initGetApiResponsesAndSavingToDB() {
    const responseArr = [];
    const timeStamp = new Date().toISOString().slice(0, 19).replace("T", " ");
    const kuCoinBaseUrl = process.env.KU_COIN_BASE_URL;
    const kuCoinURL = (0, kuCoin_1.generateKuCoinUrl)(kuCoinBaseUrl, cryptoSymbols_1.default);
    const kuCoinResponse = await (0, kuCoin_1.getDataFromKuCoin)(kuCoinURL);
    if (!kuCoinResponse) {
        console.log("No response from KuCoin API.");
        return;
    }
    const responsePrettyKuCoin = (0, kuCoinResponseDataHandler_1.default)(kuCoinResponse);
    responseArr.push(responsePrettyKuCoin);
    const coinMarketCapBaseUrl = process.env.COIN_MARKET_CAP_BASE_URL;
    const coinMarketCapApiKeyHeaderName = process.env
        .COIN_MARKET_CAP_HEADER_NAME;
    const coinMarketCapApiKey = process.env.COIN_MARKET_CAP_API_KEY;
    const coinMarketCapURL = (0, coinMarketCap_1.generateCoinMarketCapUrl)(coinMarketCapBaseUrl, cryptoSymbols_1.default);
    const coinMarketCapResponse = await (0, coinMarketCap_1.getDataFromCoinMarketCap)(coinMarketCapURL, coinMarketCapApiKeyHeaderName, coinMarketCapApiKey);
    if (!coinMarketCapResponse) {
        console.log("No response from Coinmarketcap API.");
        return;
    }
    const responsePrettyCoinMarketCap = (0, coinMarketCapResponseDataHandler_1.default)(coinMarketCapResponse);
    responseArr.push(responsePrettyCoinMarketCap);
    const coinBaseBaseUrl = process.env.COIN_BASE_BASE_URL;
    const coinBaseUrlEnding = process.env.COIN_BASE_BASE_URL_ENDING;
    const coinBaseBaseUrlArray = (0, coinBase_1.generateCoinBaseUrls)(coinBaseBaseUrl, cryptoSymbols_1.default, coinBaseUrlEnding);
    const coinBaseResponse = await (0, coinBase_1.getDataFromCoinBase)(coinBaseBaseUrlArray);
    if (!coinBaseResponse) {
        console.log("No response from Coinbase API.");
        return;
    }
    const responsePrettyCoinBase = (0, coinBaseResponseDataHandler_1.default)(coinBaseResponse);
    responseArr.push(responsePrettyCoinBase);
    const coinStatsBaseUrl = process.env.COIN_STATS_BASE_URL;
    const coinStatsBaseUrlEnding = process.env
        .COIN_STATS_BASE_URL_ENDING;
    const coinStatsBaseUrlArray = (0, coinStats_1.generateCoinStatsUrls)(coinStatsBaseUrl, cryptoNames_1.default, coinStatsBaseUrlEnding);
    const coinStatsResponse = await (0, coinStats_1.getDataFromCoinStats)(coinStatsBaseUrlArray);
    if (!coinStatsResponse) {
        console.log("No response from CoinStats API.");
        return;
    }
    const responsePrettyCoinStats = (0, coinStatsResponseDataHandler_1.default)(coinStatsResponse);
    responseArr.push(responsePrettyCoinStats);
    const coinPapricaBaseUrl = process.env.COIN_PAPRICA_BASE_URL;
    const coinPapricaResponse = await (0, coinPaprica_1.default)(coinPapricaBaseUrl);
    if (!coinPapricaResponse) {
        console.log("No response from CoinPaprica API.");
        return;
    }
    const responsePrettyCoinPaprica = (0, coinPapricaResponseDataHandler_1.default)(coinPapricaResponse);
    responseArr.push(responsePrettyCoinPaprica);
    (0, database_1.saveToDataBase)(responseArr, timeStamp);
}
async function runCron() {
    node_cron_1.default.schedule("*/5 * * * *", async () => {
        await initGetApiResponsesAndSavingToDB();
        console.log("Saved to DB");
    });
}
exports.default = runCron;
