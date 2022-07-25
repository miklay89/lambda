import dotenv from "dotenv";
import getDataFromApi from "../requestToApiHandler/requestHandler";
import {
  FullInfo,
  SwitchFollowingState,
} from "../interfaces/responseInterfaces";
import { fullInfoDataHandler } from "../responseDataHandlers/dataHandler";

dotenv.config();

export async function getFullInfo(userId: number, cryptoSymbol: string) {
  const resultArr: FullInfo[] = [];
  const url = process.env
    .GET_FULL_INFORMATION_ABOUT_CHOSEN_CRYPTOCURRENCY_URL as string;
  const data24H = await getDataFromApi(url, {
    market: "average_price",
    period: 86400000,
    userId,
    cryptoSymbol,
    switchFollowingState: "false",
  });
  const data12H = await getDataFromApi(url, {
    market: "average_price",
    period: 43200000,
    userId,
    cryptoSymbol,
    switchFollowingState: "false",
  });
  const data6H = await getDataFromApi(url, {
    market: "average_price",
    period: 21600000,
    userId,
    cryptoSymbol,
    switchFollowingState: "false",
  });
  const data3H = await getDataFromApi(url, {
    market: "average_price",
    period: 10800000,
    userId,
    cryptoSymbol,
    switchFollowingState: "false",
  });
  const data1H = await getDataFromApi(url, {
    market: "average_price",
    period: 3600000,
    userId,
    cryptoSymbol,
    switchFollowingState: "false",
  });
  const data30m = await getDataFromApi(url, {
    market: "average_price",
    period: 1800000,
    userId,
    cryptoSymbol,
    switchFollowingState: "false",
  });
  resultArr.push(
    data24H?.data,
    data12H?.data,
    data6H?.data,
    data3H?.data,
    data1H?.data,
    data30m?.data,
  );
  const message = fullInfoDataHandler(resultArr);

  return message;
}

export async function switchFollowingState(
  userId: number,
  cryptoSymbol: string,
) {
  const url = process.env
    .GET_FULL_INFORMATION_ABOUT_CHOSEN_CRYPTOCURRENCY_URL as string;
  const response = await getDataFromApi(url, {
    userId,
    cryptoSymbol,
    switchFollowingState: "true",
  });
  return response?.data as SwitchFollowingState;
}
