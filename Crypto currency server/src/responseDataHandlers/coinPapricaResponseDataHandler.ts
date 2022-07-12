import { CoinPaprica } from "../interfaces/responseInterfaces";
import { ResponseDataAfterHandlingInterface } from "../interfaces/dataAfterHandlingInterface";
import cryptoIds from "../requestQueryData/cryptoIds";

export default function coinPapricaResponseDataHandler(
  data: CoinPaprica[],
): ResponseDataAfterHandlingInterface {
  const cryptocurrencyPlatformName = "CoinPaprica";
  const response: ResponseDataAfterHandlingInterface = {
    cryptocurrencyPlatformName,
    data: [],
  };
  const filteredDataArr = data.filter(({ id }) => cryptoIds.includes(id));
  filteredDataArr.forEach((element) => {
    const cryptoCurrencySymbol = element.symbol;
    let cryptoCurrencyPrice = +element.quotes.USD.price;
    if (cryptoCurrencyPrice < 0.1) {
      cryptoCurrencyPrice = +cryptoCurrencyPrice.toFixed(8);
    } else {
      cryptoCurrencyPrice = +cryptoCurrencyPrice.toFixed(3);
    }
    const currencyData = {
      cryptoCurrencySymbol,
      cryptoCurrencyPrice,
    };
    response.data.push(currencyData);
  });
  return response;
}
