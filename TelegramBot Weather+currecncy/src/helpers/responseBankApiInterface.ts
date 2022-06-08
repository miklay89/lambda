export interface PrivatBankCurrency {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

export interface MonoBankCurrency {
  currencyCodeA: number;
  currencyCodeB: number;
  date: Date;
  rateBuy: number;
  rateSell: number;
}

export interface ResponseMonoBankApi extends Array<MonoBankCurrency> {
}

export interface ResponsePrivatBankApi extends Array<PrivatBankCurrency> {
}