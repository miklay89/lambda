"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const requestHandler_1 = __importDefault(require("../requestToApiHandler/requestHandler"));
const dataHandler_1 = require("../responseDataHandlers/dataHandler");
dotenv_1.default.config();
async function getFavouriteList(userId) {
    const params = {
        userId,
    };
    const url = process.env.GET_FAVOURITE_LIST_URL;
    const response = await (0, requestHandler_1.default)(url, params);
    if (!response)
        return null;
    const responseProcessed = (0, dataHandler_1.favouriteListDataHandler)(response === null || response === void 0 ? void 0 : response.data);
    return responseProcessed;
}
exports.default = getFavouriteList;
