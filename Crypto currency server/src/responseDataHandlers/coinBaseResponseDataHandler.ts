import { CoinBase } from "../interfaces/responseInterfaces";
import { ResponseDataAfterHandlingInterface } from "../interfaces/dataAfterHandlingInterface";

export default function coinBaseResponseDataHandler(
  data: CoinBase[],
): ResponseDataAfterHandlingInterface {
  const cryptocurrencyPlatformName = "Coinbase";
  const response: ResponseDataAfterHandlingInterface = {
    cryptocurrencyPlatformName,
    data: [],
  };
  data.forEach((element) => {
    const cryptoCurrencySymbol = element.data.base;
    let cryptoCurrencyPrice = +element.data.amount;
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
