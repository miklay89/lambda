import axios from "axios";
import { CoinPaprica } from "../interfaces/responseInterfaces";

export default async function getDataFromCoinPaprica(
  url: string,
): Promise<CoinPaprica[] | null> {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      // console.log(response.data);
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
  }
  return null;
}
