"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchFollowingState = exports.getFullInfo = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const requestHandler_1 = __importDefault(require("../requestToApiHandler/requestHandler"));
const dataHandler_1 = require("../responseDataHandlers/dataHandler");
dotenv_1.default.config();
async function getFullInfo(userId, cryptoSymbol) {
    const resultArr = [];
    const url = process.env
        .GET_FULL_INFORMATION_ABOUT_CHOSEN_CRYPTOCURRENCY_URL;
    const data24H = await (0, requestHandler_1.default)(url, {
        market: "average_price",
        period: 86400000,
        userId,
        cryptoSymbol,
        switchFollowingState: "false",
    });
    const data12H = await (0, requestHandler_1.default)(url, {
        market: "average_price",
        period: 43200000,
        userId,
        cryptoSymbol,
        switchFollowingState: "false",
    });
    const data6H = await (0, requestHandler_1.default)(url, {
        market: "average_price",
        period: 21600000,
        userId,
        cryptoSymbol,
        switchFollowingState: "false",
    });
    const data3H = await (0, requestHandler_1.default)(url, {
        market: "average_price",
        period: 10800000,
        userId,
        cryptoSymbol,
        switchFollowingState: "false",
    });
    const data1H = await (0, requestHandler_1.default)(url, {
        market: "average_price",
        period: 3600000,
        userId,
        cryptoSymbol,
        switchFollowingState: "false",
    });
    const data30m = await (0, requestHandler_1.default)(url, {
        market: "average_price",
        period: 1800000,
        userId,
        cryptoSymbol,
        switchFollowingState: "false",
    });
    if (!data24H || !data12H || !data6H || !data3H || !data1H || !data30m) {
        return null;
    }
    resultArr.push(data24H === null || data24H === void 0 ? void 0 : data24H.data, data12H === null || data12H === void 0 ? void 0 : data12H.data, data6H === null || data6H === void 0 ? void 0 : data6H.data, data3H === null || data3H === void 0 ? void 0 : data3H.data, data1H === null || data1H === void 0 ? void 0 : data1H.data, data30m === null || data30m === void 0 ? void 0 : data30m.data);
    const message = (0, dataHandler_1.fullInfoDataHandler)(resultArr);
    return message;
}
exports.getFullInfo = getFullInfo;
async function switchFollowingState(userId, cryptoSymbol) {
    const url = process.env
        .GET_FULL_INFORMATION_ABOUT_CHOSEN_CRYPTOCURRENCY_URL;
    const response = await (0, requestHandler_1.default)(url, {
        userId,
        cryptoSymbol,
        switchFollowingState: "true",
    });
    if (!response)
        return null;
    return response === null || response === void 0 ? void 0 : response.data;
}
exports.switchFollowingState = switchFollowingState;
