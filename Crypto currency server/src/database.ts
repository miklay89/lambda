import dotenv from "dotenv";
import mysql from "mysql2";
import { ResponseDataAfterHandlingInterface } from "./interfaces/dataAfterHandlingInterface";
import cryptoSymbols from "./requestQueryData/cryptoSymbols";
import {
  SQLLastMarketPrice,
  SQLAverageByIntervalResponse,
  SQLQuery,
  SQLFollowListQuery,
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

// save to DB info from API
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

// getting last price of cryptocurrency
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

// getting full info about cryptocurrency
export async function getAveragePriceByTimeInterval(
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

// getting recent list
export async function getListRecent(): Promise<SQLQuery[]> {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT crypto_currency_symbol, average_price FROM crypto_currency_price order by Timestamp desc limit 20;`,
      (error: Error, result: SQLQuery[]) => {
        if (error) reject(error);
        resolve(result);
      },
    );
  });
}

// following list
export async function checkIsFollowingFromDB(
  userId: string,
  cryptoSymbol: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT user_id, options FROM follow_list WHERE user_id="${userId}" AND options="${cryptoSymbol}";`,
      (error: Error, result: SQLFollowListQuery[]) => {
        if (error) reject(error);
        if (result.length === 0) {
          resolve(false);
          return;
        }
        resolve(true);
      },
    );
  });
}

// update folowing list
export async function updateFollowingState(
  userId: string,
  cryptoSymbol: string,
  isFollowing: boolean,
) {
  return new Promise((resolve, reject) => {
    // delete from DB
    if (isFollowing) {
      connection.query(
        `DELETE FROM follow_list WHERE user_id="${userId}";`,
        (error: Error) => {
          if (error) reject(error);
        },
      );
      resolve(true);
      return;
    }
    connection.query(
      `INSERT INTO follow_list (user_id, options) VALUES ("${userId}","${cryptoSymbol}");`,
      (error: Error) => {
        if (error) reject(error);
      },
    );
    resolve(true);
  });
}

// favourite list
// getting query params for favourite list
export async function getFavouriteListFromDB(userId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT user_id, options FROM favourite_list WHERE user_id="${userId}";`,
      (error: Error, result: SQLFollowListQuery[]) => {
        if (error) reject(error);
        if (result.length === 0) {
          resolve("");
          return;
        }

        const favouriteListArr = result.map(({ options }) => options);
        let favouriteQueryString = ``;
        favouriteListArr.forEach((el, index) => {
          favouriteQueryString += `"${el}",`;
          if (index === favouriteListArr.length - 1)
            favouriteQueryString = favouriteQueryString.slice(
              0,
              favouriteQueryString.length - 1,
            );
        });
        resolve(favouriteQueryString);
      },
    );
  });
}

// extracting data from DB by favourite query string
export async function getFavouriteListCryptoCurrency(queryString: string) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT a.crypto_currency_symbol, a.average_price FROM
          (SELECT * FROM crypto_currency_price order by Timestamp desc limit 20) a WHERE
          crypto_currency_symbol in (${queryString});`,
      (error: Error, result: SQLQuery[]) => {
        if (error) reject(error);
        resolve(result);
      },
    );
  });
}

// check in favourite list
export async function checkInFavouriteList(
  userId: string,
  cryptoSymbol: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT user_id, options FROM favourite_list WHERE user_id="${userId}" AND options="${cryptoSymbol}";`,
      (error: Error, result: SQLFollowListQuery[]) => {
        if (error) reject(error);
        if (result.length === 0) {
          resolve(false);
          return;
        }
        resolve(true);
      },
    );
  });
}

// save to favourite_list
export async function saveToFavouriteList(
  userId: string,
  cryptoSymbol: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO favourite_list (user_id, options) VALUES ("${userId}","${cryptoSymbol}");`,
      (error: Error) => {
        if (error) reject(error);
      },
    );
    resolve(true);
  });
}

// delete from favourite list
export async function deleteFromFavouriteList(
  userId: string,
  cryptoSymbol: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM favourite_list WHERE user_id="${userId}" AND options="${cryptoSymbol}";`,
      (error: Error) => {
        if (error) reject(error);
      },
    );
    resolve(true);
  });
}
