import { RequestHandler } from "express";
import {
  getFavouriteListFromDB,
  getFavouriteListCryptoCurrency,
} from "../database";

const getFavouriteList: RequestHandler = async (req, res) => {
  const userId = req.query.userId as string;
  const favouriteListQuery = await getFavouriteListFromDB(userId);

  if (!favouriteListQuery) {
    res.json({
      message: "No cryptocurrency in favourite list",
    });
    return;
  }

  const data = await getFavouriteListCryptoCurrency(favouriteListQuery);
  res.json({
    message: "Favourite list cryptocurrency",
    data,
  });
};

export default getFavouriteList;
