"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandlerPrivat = exports.filterDataPrivat = void 0;
var Currency;
(function (Currency) {
    Currency["usd"] = "USD";
    Currency["eur"] = "EUR";
})(Currency || (Currency = {}));
function filterDataPrivat(data) {
    const filtered = data.filter(el => {
        if (el.ccy == Currency.usd)
            return true;
        if (el.ccy == Currency.eur)
            return true;
        return false;
    });
    return filtered;
}
exports.filterDataPrivat = filterDataPrivat;
function responseHandlerPrivat(data) {
    const shift = '\r\n';
    let responseString = 'Currency rates UAH in Privat Bank:' + shift;
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
exports.responseHandlerPrivat = responseHandlerPrivat;
