import dotenv from "dotenv";
import mysql from "mysql2";
import { ResponseDataAfterHandlingInterface } from "./interfaces/dataAfterHandlingInterface";
import cryptoSymbols from "./requestQueryData/cryptoSymbols";
import {
  SQLLastMarketPrice,
  SQLAverageByIntervalResponse,
} from "./interfaces/responseInterfaces";

dotenv.config();

const dataBaseUrl = process.env.DATABASE_URL as string;
const connection = mysql.createConnection(dataBaseUrl);
// console.log("Connected to PlanetScale!");

function valueOfCryptoCurrencyPriceByPlatform(
  data: ResponseDataAfterHandlingInterface[],
  cryptoPlatformName: string,
  cryptoSymbol: string,
): number {
  const filteredDataByPlatformName = data.find(
    (item) => item.cryptocurrencyPlatformName === cryptoPlatformName,
  );
  if (!filteredDataByPlatformName) return 0;

  const cryptoPricesData = filteredDataByPlatformName.data;
  let price = 0;
  // eslint-disable-next-line array-callback-return
  cryptoPricesData.find((item) => {
    if (item.cryptoCurrencySymbol === cryptoSymbol) {
      price = item.cryptoCurrencyPrice;
    }
  });

  return price;
}

function averagePrice(
  one: number,
  two: number,
  three: number,
  four: number,
  five: number,
) {
  let average = 0;
  average = (one + two + three + four + five) / 5;
  return average;
}

export async function saveToDataBase(
  data: ResponseDataAfterHandlingInterface[],
  timeStamp: string,
): Promise<void> {
  try {
    cryptoSymbols.forEach((cryptoCurrencySymbol) => {
      connection.query(
        "INSERT INTO crypto_currency_price (crypto_currency_symbol, KuCoin, Coinbase, CoinMarketCap, CoinPaprica, CoinStats, average_price, Timestamp) VALUES (?,?,?,?,?,?,?,?)",
        [
          cryptoCurrencySymbol,
          valueOfCryptoCurrencyPriceByPlatform(
            data,
            "KuCoin",
            cryptoCurrencySymbol,
          ),
          valueOfCryptoCurrencyPriceByPlatform(
            data,
            "Coinbase",
            cryptoCurrencySymbol,
          ),
          valueOfCryptoCurrencyPriceByPlatform(
            data,
            "CoinMarketCap",
            cryptoCurrencySymbol,
          ),
          valueOfCryptoCurrencyPriceByPlatform(
            data,
            "CoinPaprica",
            cryptoCurrencySymbol,
          ),
          valueOfCryptoCurrencyPriceByPlatform(
            data,
            "CoinStats",
            cryptoCurrencySymbol,
          ),
          averagePrice(
            valueOfCryptoCurrencyPriceByPlatform(
              data,
              "KuCoin",
              cryptoCurrencySymbol,
            ),
            valueOfCryptoCurrencyPriceByPlatform(
              data,
              "Coinbase",
              cryptoCurrencySymbol,
            ),
            valueOfCryptoCurrencyPriceByPlatform(
              data,
              "CoinMarketCap",
              cryptoCurrencySymbol,
            ),
            valueOfCryptoCurrencyPriceByPlatform(
              data,
              "CoinPaprica",
              cryptoCurrencySymbol,
            ),
            valueOfCryptoCurrencyPriceByPlatform(
              data,
              "CoinStats",
              cryptoCurrencySymbol,
            ),
          ),
          timeStamp,
        ],
        (error) => {
          if (error) console.log(error);
        },
      );
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getLastPrice(
  cryptoCurrencySymbol: string,
  cryptoMarket: string,
): Promise<SQLLastMarketPrice> {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT a.${cryptoMarket} FROM 
      (SELECT crypto_currency_symbol, ${cryptoMarket} FROM 
      crypto_currency_price order by Timestamp desc limit 20) a 
      WHERE a.crypto_currency_symbol="${cryptoCurrencySymbol}";`,
      (error: Error, result: SQLLastMarketPrice) => {
        if (error) reject(error);
        resolve(result);
      },
    );
  });
}

async function getAveragePriceByTimeInterval(
  cryptoCurrencySymbol: string,
  cryptoMarket: string,
  timeInterval: number,
): Promise<SQLAverageByIntervalResponse> {
  return new Promise((resolve, reject) => {
    const currentDate = new Date();
    const queryDateWithTimeInterval = currentDate.getTime() - timeInterval;
    const timeStamp = new Date(queryDateWithTimeInterval);
    const sqlTimestamp = timeStamp.toISOString().slice(0, 19).replace("T", " ");

    connection.query(
      `SELECT AVG(a.${cryptoMarket}) FROM 
      (SELECT crypto_currency_symbol, ${cryptoMarket}, Timestamp FROM 
      crypto_currency_price WHERE crypto_currency_symbol="${cryptoCurrencySymbol}" AND 
      Timestamp > "${sqlTimestamp}" ORDER BY Timestamp) a;`,
      (error: Error, result: SQLAverageByIntervalResponse) => {
        if (error) reject(error);
        resolve(result);
      },
    );
  });
}

export async function readFromDB(
  cryptoCurrencySymbol: string,
  cryptoMarket: string,
  timeInterval?: number,
): Promise<SQLLastMarketPrice | SQLAverageByIntervalResponse | null> {
  // getting last average price by cryptoSymbol
  try {
    if (timeInterval) {
      const priceByInterval = await getAveragePriceByTimeInterval(
        cryptoCurrencySymbol,
        cryptoMarket,
        timeInterval,
      );
      return priceByInterval;
    }
    const lastPrice = await getLastPrice(cryptoCurrencySymbol, cryptoMarket);
    return lastPrice;
  } catch (error) {
    console.log(error);
  }
  return null;
}
