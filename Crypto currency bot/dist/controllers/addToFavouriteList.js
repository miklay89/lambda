"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const requestHandler_1 = __importDefault(require("../requestToApiHandler/requestHandler"));
dotenv_1.default.config();
async function addToFavouriteList(userId, cryptoSymbol) {
    var _a;
    const params = {
        cryptoSymbol,
        userId,
    };
    const url = process.env.ADD_TO_FAVOURITE_LIST_URL;
    const response = await (0, requestHandler_1.default)(url, params);
    return (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.message;
}
exports.default = addToFavouriteList;
