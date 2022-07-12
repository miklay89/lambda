import { CoinMarketCap } from "../interfaces/responseInterfaces";
import { ResponseDataAfterHandlingInterface } from "../interfaces/dataAfterHandlingInterface";

export default function coinMarketCapResponseDataHandler(
  data: CoinMarketCap,
): ResponseDataAfterHandlingInterface {
  const cryptocurrencyPlatformName = "CoinMarketCap";
  const response: ResponseDataAfterHandlingInterface = {
    cryptocurrencyPlatformName,
    data: [],
  };
  const mappedArr = Object.entries(data).map((item) => {
    const cryptoCurrencySymbol = item[1].symbol;
    let cryptoCurrencyPrice = +item[1].quote.USD.price;
    if (cryptoCurrencyPrice < 0.1) {
      cryptoCurrencyPrice = +cryptoCurrencyPrice.toFixed(8);
    } else {
      cryptoCurrencyPrice = +cryptoCurrencyPrice.toFixed(3);
    }
    const currencyData = {
      cryptoCurrencySymbol,
      cryptoCurrencyPrice,
    };
    return currencyData;
  });
  response.data.push(...mappedArr);
  return response;
}
