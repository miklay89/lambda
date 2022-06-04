import axios from "axios";
import Response from "./responseDataInterface";

export default async function getWeatherData(url: string): Promise<Response | undefined> {
  try {
    const response = await axios.get(url);
    const data: Response = response.data;
    return data;
  } catch (err) {
    console.log(err);
  }
}