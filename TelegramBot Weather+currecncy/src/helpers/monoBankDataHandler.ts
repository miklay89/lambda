import { MonoBankCurrency, ResponseMonoBankApi } from "./responseBankApiInterface";

enum Currency {
  usd = 840,
  eur = 978,
  uah = 980,
  usdString = 'USD',
  eurString = 'EUR',
  uahString = 'UAH',
}

export function filterDataMono(data: ResponseMonoBankApi) : MonoBankCurrency[] {
  const filtered = data.filter(el => {
    if(el.currencyCodeA == Currency.usd && el.currencyCodeB == Currency.uah) return true
    if(el.currencyCodeA == Currency.eur && el.currencyCodeB == Currency.uah) return true
    return false
  });
  return filtered;
}

export function responseHandlerMono (data: MonoBankCurrency[]) : string {
  const shift = '\r\n';
  let responseString: string = 'Currency rates UAH in Mono Bank:' + shift;
  data.forEach(el => {
    let currency = el.currencyCodeA == Currency.usd ? Currency.usdString : Currency.eurString;
    const baseCurrency = Currency.uahString;
    const sale = el.rateSell;
    const buy = el.rateBuy;
    const string = `${currency}: buy - ${buy.toFixed(2)} ${baseCurrency}, sale - ${sale.toFixed(2)} ${baseCurrency}`;
    responseString += string + shift;
  });
  return responseString;
}