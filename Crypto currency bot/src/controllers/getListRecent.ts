import dotenv from "dotenv";
import getDataFromApi from "../requestToApiHandler/requestHandler";
import { recentListDataHandler } from "../responseDataHandlers/dataHandler";

dotenv.config();

export default async function getListRecent() {
  const url = process.env.GET_LIST_RECENT_URL as string;
  const response = await getDataFromApi(url, {});
  const responseProcced = recentListDataHandler(response?.data);
  return responseProcced;
}
