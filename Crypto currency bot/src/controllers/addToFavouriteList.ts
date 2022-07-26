import dotenv from "dotenv";
import getDataFromApi from "../requestToApiHandler/requestHandler";

dotenv.config();

export default async function addToFavouriteList(
  userId: number,
  cryptoSymbol: string,
) {
  const params = {
    cryptoSymbol,
    userId,
  };
  const url = process.env.ADD_TO_FAVOURITE_LIST_URL as string;
  const response = await getDataFromApi(url, params);
  if (!response) return null;
  return response?.data?.message;
}
