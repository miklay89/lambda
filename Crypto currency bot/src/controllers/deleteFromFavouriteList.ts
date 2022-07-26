import dotenv from "dotenv";
import getDataFromApi from "../requestToApiHandler/requestHandler";

dotenv.config();

export default async function deleteFromFavouriteList(
  userId: number,
  cryptoSymbol: string,
) {
  const params = {
    cryptoSymbol,
    userId,
  };
  const url = process.env.DELETE_FROM_FAVOURITE_LIST_URL as string;
  const response = await getDataFromApi(url, params);
  if (!response) return null;
  return response?.data?.message;
}
