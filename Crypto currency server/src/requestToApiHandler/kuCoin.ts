import axios from "axios";
import { KuCoinResponse } from "../interfaces/responseInterfaces";

export function generateKuCoinUrl(
  baseUrl: string,
  arrCryptoSymbols: string[],
): string {
  return baseUrl + arrCryptoSymbols.join(",");
}

export async function getDataFromKuCoin(
  url: string,
): Promise<KuCoinResponse | null> {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}

// https://api.kucoin.com/api/v1/prices?base=USD&currencies=BTC,ETH,USDT,ETC,DOGE,LTC,ADA,SOL,LINK,ALGO,DOT,SHIB,ZEC,AVAX,UNI,XLM,BCH,ATOM,ICP,MATIC

// {
//   "code": "200000",
//   "data": {
//       "MATIC": "0.42621606",
//       "BCH": "118.70307005",
//       "DOT": "7.80596821",
//       "SHIB": "0.00001105",
//       "DOGE": "0.06578074",
//       "USDT": "0.99910000",
//       "ALGO": "0.32550678",
//       "ATOM": "6.84563340",
//       "BTC": "20941.10249424",
//       "UNI": "4.79228300",
//       "SOL": "36.77986417",
//       "AVAX": "16.91676077",
//       "ETC": "16.03855289",
//       "ICP": "5.74482511",
//       "ETH": "1127.13078598",
//       "XLM": "0.11434000",
//       "ZEC": "67.11954952",
//       "LINK": "6.87740487",
//       "LTC": "53.02524099",
//       "ADA": "0.48270617"
//   }
// }
