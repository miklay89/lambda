import axios from "axios";
import { CoinStats } from "../interfaces/responseInterfaces";

export function generateCoinStatsUrls(
  baseUrl: string,
  cryptoNames: string[],
  urlEnding: string,
): string[] {
  const generatedUrls: string[] = [];
  cryptoNames.forEach((element) => {
    const generatedUrl = baseUrl + element + urlEnding;
    generatedUrls.push(generatedUrl);
  });

  return generatedUrls;
}

export async function getDataFromCoinStats(
  urlsArray: string[],
): Promise<CoinStats[] | null> {
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
