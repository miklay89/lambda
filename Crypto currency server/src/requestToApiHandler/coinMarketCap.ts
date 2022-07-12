import axios from "axios";
import { CoinMarketCap } from "../interfaces/responseInterfaces";

export function generateCoinMarketCapUrl(
  baseUrl: string,
  arrCryptoSymbols: string[],
): string {
  return baseUrl + arrCryptoSymbols.join(",");
}

export async function getDataFromCoinMarketCap(
  url: string,
  apiKeyHeaderName: string,
  apiKey: string,
): Promise<CoinMarketCap | null> {
  try {
    const response = await axios.get(url, {
      headers: {
        [apiKeyHeaderName]: apiKey,
      },
    });
    if (response.status === 200) {
      // console.log(response.data);
      return response.data.data;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}
// https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,USDT,ETC,DOGE,LTC,BTG,GMT,SNX,GST,BORA,GALA,DFI,FTT,XTZ,APE,REN,MTL,PLA,STX
