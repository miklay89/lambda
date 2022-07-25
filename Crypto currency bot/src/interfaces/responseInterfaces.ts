interface CryptocurrencyData {
  crypto_currency_symbol: string;
  average_price: string;
}

export interface FavouriteList {
  message: string;
  data?: CryptocurrencyData[];
}

export interface ListRecent {
  message: string;
  prices: CryptocurrencyData[];
}

export interface FullInfo {
  cryptoSymbol: string;
  market: string;
  average_price: string;
  period: string;
  isFollowing: string;
}

export interface SwitchFollowingState {
  message: string;
}
