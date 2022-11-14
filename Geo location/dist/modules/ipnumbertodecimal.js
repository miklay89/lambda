"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calcIPNumber(ipAdress) {
    const ipNumber = ipAdress.split('.');
    const string = 16777216 * parseInt(ipNumber[0]) + 65536 * parseInt(ipNumber[1]) + 256 * parseInt(ipNumber[2]) + parseInt(ipNumber[3]);
    return string;
}
exports.default = calcIPNumber;
