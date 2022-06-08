"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function getData(url) {
    try {
        const response = await axios_1.default.get(url);
        const data = response.data;
        return data;
    }
    catch (err) {
        console.log(err);
    }
}
exports.default = getData;
