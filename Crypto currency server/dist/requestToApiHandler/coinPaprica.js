"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function getDataFromCoinPaprica(url) {
    try {
        const response = await axios_1.default.get(url);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    }
    catch (err) {
        console.log(err);
    }
    return null;
}
exports.default = getDataFromCoinPaprica;
