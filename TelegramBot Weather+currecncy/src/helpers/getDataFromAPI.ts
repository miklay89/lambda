import axios from "axios";
import ResponseWeatherApi from "./responseWeatherApiInterface";
import { ResponseMonoBankApi, ResponsePrivatBankApi } from "./responseBankApiInterface";


export default async function getData(url: string): Promise<ResponseWeatherApi | ResponseMonoBankApi | ResponsePrivatBankApi | undefined> {
  try {
    const response = await axios.get(url);
    const data: ResponseWeatherApi = response.data;
    return data;
  } catch (err) {
    console.log(err);
  }
}