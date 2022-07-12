import { KuCoinResponse } from "../interfaces/responseInterfaces";
import { ResponseDataAfterHandlingInterface } from "../interfaces/dataAfterHandlingInterface";

export default function kuCoinResponseDataHandler(
  data: KuCoinResponse,
): ResponseDataAfterHandlingInterface {
  const cryptocurrencyPlatformName = "KuCoin";
  const response: ResponseDataAfterHandlingInterface = {
    cryptocurrencyPlatformName,
    data: [],
  };
  const mappedArr = Object.entries(data.data).map((key) => {
    const cryptoCurrencySymbol = key[0];
    let cryptoCurrencyPrice = +key[1];
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
