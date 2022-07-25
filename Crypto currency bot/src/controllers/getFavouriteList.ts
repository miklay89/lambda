import dotenv from "dotenv";
import getDataFromApi from "../requestToApiHandler/requestHandler";
import { favouriteListDataHandler } from "../responseDataHandlers/dataHandler";

dotenv.config();

export default async function getFavouriteList(userId: number) {
  const params = {
    userId,
  };
  const url = process.env.GET_FAVOURITE_LIST_URL as string;
  const response = await getDataFromApi(url, params);
  const responseProcessed = favouriteListDataHandler(response?.data);
  return responseProcessed;
}
