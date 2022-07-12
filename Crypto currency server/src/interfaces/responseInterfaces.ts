export interface KuCoinResponse {
  code: number;
  data: {
    [key: string]: string;
  };
}

export interface CoinBase {
  data: {
    base: string;
    currency: string;
    amount: string;
  };
}

export interface CoinStats {
  coin: {
    icon: string;
    id: string;
    name: string;
    symbol: string;
    rank: number;
    price: number;
    priceBtc: number;
    volume: number;
    marketCap: number;
    availableSupply: number;
    totalSupply: number;
    priceChange1h: number;
    priceChange1d: number;
    priceChange1w: number;
    websiteUrl: string;
    twitterUrl: string;
    exp: string[];
  };
}

export interface CoinMarKetCapCoin {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: Date;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  is_active: number;
  platform: string;
  cmc_rank: number;
  is_fiat: number;
  self_reported_circulating_supply: string;
  self_reported_market_cap: string;
  tvl_ratio: string;
  last_updated: Date;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      volume_change_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      market_cap: number;
      market_cap_dominance: number;
      fully_diluted_market_cap: number;
      tvl: string;
      last_updated: Date;
    };
  };
}

export interface CoinMarketCap {
  [key: string]: CoinMarKetCapCoin;
}

export interface CoinPaprica {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: Date;
      percent_from_price_ath: number;
    };
  };
}

export interface SQLQueryByInterval {
  [key: string]: string;
}

export interface SQLAverageByIntervalResponse {
  [key: string]: SQLQueryByInterval;
}

export interface SQLLastMarketPrice {
  [key: string]: {
    [marketName: string]: string;
  };
}
