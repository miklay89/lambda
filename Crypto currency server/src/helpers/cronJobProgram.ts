import dotenv from "dotenv";
import cron from "node-cron";
import cryptoSymbols from "../requestQueryData/cryptoSymbols";
import cryptoNames from "../requestQueryData/cryptoNames";

// KuCoin
import {
  generateKuCoinUrl,
  getDataFromKuCoin,
} from "../requestToApiHandler/kuCoin";
import kuCoinResponseDataHandler from "../responseDataHandlers/kuCoinResponseDataHandler";

// CoinMarketCap
import {
  generateCoinMarketCapUrl,
  getDataFromCoinMarketCap,
} from "../requestToApiHandler/coinMarketCap";
import coinMarketCapResponseDataHandler from "../responseDataHandlers/coinMarketCapResponseDataHandler";

// CoinBase
import {
  generateCoinBaseUrls,
  getDataFromCoinBase,
} from "../requestToApiHandler/coinBase";
import coinBaseResponseDataHandler from "../responseDataHandlers/coinBaseResponseDataHandler";

// CoinStats
import {
  generateCoinStatsUrls,
  getDataFromCoinStats,
} from "../requestToApiHandler/coinStats";

// CoinPaprica
import getDataFromCoinPaprica from "../requestToApiHandler/coinPaprica";
import coinStatsResponseDataHandler from "../responseDataHandlers/coinStatsResponseDataHandler";
import coinPapricaResponseDataHandler from "../responseDataHandlers/coinPapricaResponseDataHandler";

// Database
import { saveToDataBase } from "../database";

dotenv.config();

async function initGetApiResponsesAndSavingToDB() {
  const responseArr = [];
  const timeStamp = new Date().toISOString().slice(0, 19).replace("T", " ");

  // KuCoin
  const kuCoinBaseUrl = process.env.KU_COIN_BASE_URL as string;
  const kuCoinURL = generateKuCoinUrl(kuCoinBaseUrl, cryptoSymbols);
  const kuCoinResponse = await getDataFromKuCoin(kuCoinURL);
  if (!kuCoinResponse) {
    console.log("No response from KuCoin API.");
    return;
  }
  const responsePrettyKuCoin = kuCoinResponseDataHandler(kuCoinResponse);
  responseArr.push(responsePrettyKuCoin);

  // CoinMarketCap
  const coinMarketCapBaseUrl = process.env.COIN_MARKET_CAP_BASE_URL as string;
  const coinMarketCapApiKeyHeaderName = process.env
    .COIN_MARKET_CAP_HEADER_NAME as string;
  const coinMarketCapApiKey = process.env.COIN_MARKET_CAP_API_KEY as string;
  const coinMarketCapURL = generateCoinMarketCapUrl(
    coinMarketCapBaseUrl,
    cryptoSymbols,
  );
  const coinMarketCapResponse = await getDataFromCoinMarketCap(
    coinMarketCapURL,
    coinMarketCapApiKeyHeaderName,
    coinMarketCapApiKey,
  );
  if (!coinMarketCapResponse) {
    console.log("No response from Coinmarketcap API.");
    return;
  }
  const responsePrettyCoinMarketCap = coinMarketCapResponseDataHandler(
    coinMarketCapResponse,
  );
  responseArr.push(responsePrettyCoinMarketCap);

  // CoinBase
  const coinBaseBaseUrl = process.env.COIN_BASE_BASE_URL as string;
  const coinBaseUrlEnding = process.env.COIN_BASE_BASE_URL_ENDING as string;
  const coinBaseBaseUrlArray = generateCoinBaseUrls(
    coinBaseBaseUrl,
    cryptoSymbols,
    coinBaseUrlEnding,
  );
  const coinBaseResponse = await getDataFromCoinBase(coinBaseBaseUrlArray);
  if (!coinBaseResponse) {
    console.log("No response from Coinbase API.");
    return;
  }
  const responsePrettyCoinBase = coinBaseResponseDataHandler(coinBaseResponse);
  responseArr.push(responsePrettyCoinBase);

  // CoinStats
  const coinStatsBaseUrl = process.env.COIN_STATS_BASE_URL as string;
  const coinStatsBaseUrlEnding = process.env
    .COIN_STATS_BASE_URL_ENDING as string;
  const coinStatsBaseUrlArray = generateCoinStatsUrls(
    coinStatsBaseUrl,
    cryptoNames,
    coinStatsBaseUrlEnding,
  );
  const coinStatsResponse = await getDataFromCoinStats(coinStatsBaseUrlArray);
  if (!coinStatsResponse) {
    console.log("No response from CoinStats API.");
    return;
  }
  const responsePrettyCoinStats =
    coinStatsResponseDataHandler(coinStatsResponse);
  responseArr.push(responsePrettyCoinStats);

  // coinPaprica
  const coinPapricaBaseUrl = process.env.COIN_PAPRICA_BASE_URL as string;
  const coinPapricaResponse = await getDataFromCoinPaprica(coinPapricaBaseUrl);
  if (!coinPapricaResponse) {
    console.log("No response from CoinPaprica API.");
    return;
  }
  const responsePrettyCoinPaprica =
    coinPapricaResponseDataHandler(coinPapricaResponse);
  responseArr.push(responsePrettyCoinPaprica);

  // Saving to database
  saveToDataBase(responseArr, timeStamp);
}

export default async function runCron() {
  cron.schedule("*/5 * * * *", async () => {
    await initGetApiResponsesAndSavingToDB();
    console.log("Saved to DB");
  });
}
