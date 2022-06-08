"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandlerMono = exports.filterDataMono = void 0;
var Currency;
(function (Currency) {
    Currency[Currency["usd"] = 840] = "usd";
    Currency[Currency["eur"] = 978] = "eur";
    Currency[Currency["uah"] = 980] = "uah";
    Currency["usdString"] = "USD";
    Currency["eurString"] = "EUR";
    Currency["uahString"] = "UAH";
})(Currency || (Currency = {}));
function filterDataMono(data) {
    const filtered = data.filter(el => {
        if (el.currencyCodeA == Currency.usd && el.currencyCodeB == Currency.uah)
            return true;
        if (el.currencyCodeA == Currency.eur && el.currencyCodeB == Currency.uah)
            return true;
        return false;
    });
    return filtered;
}
exports.filterDataMono = filterDataMono;
function responseHandlerMono(data) {
    const shift = '\r\n';
    let responseString = 'Currency rates UAH in Mono Bank:' + shift;
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
exports.responseHandlerMono = responseHandlerMono;
