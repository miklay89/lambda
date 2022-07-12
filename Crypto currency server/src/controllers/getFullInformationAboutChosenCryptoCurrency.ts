import { RequestHandler } from "express";
import { readFromDB } from "../database";
import cryptoSymbols from "../requestQueryData/cryptoSymbols";
import cryptoMarkets from "../requestQueryData/cryptoMarkets";
import {
  SQLAverageByIntervalResponse,
  SQLLastMarketPrice,
} from "../interfaces/responseInterfaces";

const getFullInformationAboutChosenCryptoCurrency: RequestHandler = async (
  req,
  res,
) => {
  const cryptoSymbol = req.query.cryptoSymbol as string;
  const market = req.query.market as string;
  const period = req.query.period as string;

  // checking valid query crypto symbol
  const cryptoSymbolCandidate = cryptoSymbols.find(
    (storedSymbol) => storedSymbol === cryptoSymbol,
  );
  if (!cryptoSymbolCandidate) {
    res.json({
      message: `Crypto symbol incorrect, please use one from list: ${cryptoSymbols}`,
    });
    return;
  }

  // checking valid query crypto market
  const cryptoMarketCandidate = cryptoMarkets.find(
    (storedMarket) => storedMarket === market,
  );
  if (!cryptoMarketCandidate) {
    res.json({
      message: `Crypto market incorrect, please use one from list: ${cryptoMarkets}`,
    });
    return;
  }

  // checking period
  if (period) {
    const data = (await readFromDB(
      cryptoSymbol,
      market,
      +period,
    )) as SQLAverageByIntervalResponse;
    if (!data) {
      res.json("No data founded in DB");
      return;
    }
    const responseMessage = {
      cryptoSymbol,
      market,
      average_price: data[0][`AVG(a.${market})`],
      period: `${period} ms`,
    };
    res.json(responseMessage);
    return;
  }
  const data = (await readFromDB(cryptoSymbol, market)) as SQLLastMarketPrice;
  if (!data) {
    res.json("No data founded in DB");
    return;
  }
  const responseMessage = {
    cryptoSymbol,
    market,
    last_price: data[0][`${market}`],
    period: "not set",
  };
  res.json(responseMessage);
};

export default getFullInformationAboutChosenCryptoCurrency;
