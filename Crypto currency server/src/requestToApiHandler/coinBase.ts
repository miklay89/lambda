// https://api.coinbase.com/v2/prices/BTC-USD/spot
import axios from "axios";
import { CoinBase } from "../interfaces/responseInterfaces";

export function generateCoinBaseUrls(
  baseUrl: string,
  cryptoSymbols: string[],
  urlEnding: string,
): string[] {
  const generatedUrls: string[] = [];
  cryptoSymbols.forEach((element) => {
    const generatedUrl = baseUrl + element + urlEnding;
    generatedUrls.push(generatedUrl);
  });

  return generatedUrls;
}

export async function getDataFromCoinBase(
  urlsArray: string[],
): Promise<CoinBase[] | null> {
  try {
    const promises = urlsArray.map(async (url) => {
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    });
    const resultResponse = Promise.all([...promises]).then((result) => {
      return result;
    });
    return resultResponse;
  } catch (err) {
    console.log(err);
  }
  return null;
}
