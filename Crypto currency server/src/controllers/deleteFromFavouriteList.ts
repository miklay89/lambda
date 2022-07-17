import { RequestHandler } from "express";
import { checkInFavouriteList, deleteFromFavouriteList } from "../database";

const deleteFromFavourite: RequestHandler = async (req, res) => {
  const userId = req.query.userId as string;
  const cryptoSymbol = req.query.cryptoSymbol as string;

  const isFavourite = await checkInFavouriteList(userId, cryptoSymbol);

  if (isFavourite) {
    await deleteFromFavouriteList(userId, cryptoSymbol);
    res.json({
      message: `Cryptocurrency ${cryptoSymbol} was deleted from favourite list`,
    });
    return;
  }

  res.json({
    message: `Cryptocurrency ${cryptoSymbol} already deleted from favourite list.`,
  });
};

export default deleteFromFavourite;
