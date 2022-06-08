import { ResponsePrivatBankApi, PrivatBankCurrency } from './responseBankApiInterface';

enum Currency {
  usd = 'USD',
  eur = 'EUR',
}

export function filterDataPrivat(data: ResponsePrivatBankApi) : PrivatBankCurrency[] {
  const filtered = data.filter(el => {
    if(el.ccy == Currency.usd) return true
    if(el.ccy == Currency.eur) return true
    return false
  });
  return filtered;
}

export function responseHandlerPrivat(data: PrivatBankCurrency[]) : string {
  const shift = '\r\n';
  let responseString: string = 'Currency rates UAH in Privat Bank:' + shift;
  data.forEach(el => {
    const currency = el.ccy;
    const baseCurrency = el.base_ccy;
    const sale = +el.sale;
    const buy = +el.buy;
    const string = `${currency}: buy - ${buy.toFixed(2)} ${baseCurrency}, sale - ${sale.toFixed(2)} ${baseCurrency}`;
    responseString += string + shift;
  });
  return responseString;
}