import { RequestHandler } from "express";
import { checkInFavouriteList, saveToFavouriteList } from "../database";

const addToFavouriteList: RequestHandler = async (req, res) => {
  const userId = req.query.userId as string;
  const cryptoSymbol = req.query.cryptoSymbol as string;

  const isFavourite = await checkInFavouriteList(userId, cryptoSymbol);

  if (!isFavourite) {
    await saveToFavouriteList(userId, cryptoSymbol);
    res.json({
      message: `Cryptocurrency ${cryptoSymbol} saved to favourite list`,
    });
    return;
  }

  res.json({
    message: `Cryptocurrency ${cryptoSymbol} already stored in DB.`,
  });
};

export default addToFavouriteList;
