"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function getDataFromApi(url, params) {
    try {
        const response = await axios_1.default.post(url, null, { params });
        return response;
    }
    catch (error) {
        console.log(error);
    }
    return null;
}
exports.default = getDataFromApi;
