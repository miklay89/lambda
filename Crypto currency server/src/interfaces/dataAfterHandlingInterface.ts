export interface CurrencyDataAfterHandlingInterface {
  cryptoCurrencySymbol: string;
  cryptoCurrencyPrice: number;
}

export interface ResponseDataAfterHandlingInterface {
  cryptocurrencyPlatformName: string;
  data: CurrencyDataAfterHandlingInterface[];
}
