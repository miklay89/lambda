import { RequestHandler } from "express";
import {
  getAveragePriceByTimeInterval,
  getLastPrice,
  checkIsFollowingFromDB,
  updateFollowingState,
} from "../database";

const getFullInformationAboutChosenCryptoCurrency: RequestHandler = async (
  req,
  res,
) => {
  const cryptoSymbol = req.query.cryptoSymbol as string;
  const market = req.query.market as string;
  const period = req.query.period as string;
  const userId = req.query.userId as string;
  const switchFollowingState = req.query.switchFollowingState as string;

  // check in following list
  const isFollowing = await checkIsFollowingFromDB(userId, cryptoSymbol);

  // switching following state
  if (switchFollowingState === "true") {
    await updateFollowingState(userId, cryptoSymbol, isFollowing);
    res.json({ message: "following state was changed" });
    return;
  }

  // checking period
  if (period) {
    const data = await getAveragePriceByTimeInterval(
      cryptoSymbol,
      market,
      +period,
    );
    if (!data) {
      res.json("No data founded in DB");
      return;
    }
    const responseMessage = {
      cryptoSymbol,
      market,
      average_price: data[0][`AVG(a.${market})`],
      period: `${period} ms`,
      isFollowing,
    };
    res.json(responseMessage);
    return;
  }

  // getting last price
  const data = await getLastPrice(cryptoSymbol, market);
  if (!data) {
    res.json("No data founded in DB");
    return;
  }

  const responseMessage = {
    cryptoSymbol,
    market,
    last_price: data[0][`${market}`],
    period: "not set",
    isFollowing,
  };
  res.json(responseMessage);
};

export default getFullInformationAboutChosenCryptoCurrency;
