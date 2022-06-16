"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlShorter = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const headers = {
    "Content-Type": "application/json",
    "apikey": process.env.url_shorter_api_key,
};
async function urlShorter(url) {
    let endpoint = "https://api.rebrandly.com/v1/links";
    let linkRequest = {
        destination: url,
        domain: { fullName: "rebrand.ly" }
    };
    const apiCall = {
        method: 'post',
        url: endpoint,
        data: linkRequest,
        headers: headers
    };
    let apiResponse = await (0, axios_1.default)(apiCall);
    let link = apiResponse.data;
    return link.shortUrl;
}
exports.urlShorter = urlShorter;
