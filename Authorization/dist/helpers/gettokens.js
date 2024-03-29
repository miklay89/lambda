"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
function getTokens(user_id, email, secret) {
    // from 30 to 60 sec
    const expTokenTime = Math.floor(30 + Math.random() * 30);
    // 2 days
    const accessToken = jsonwebtoken_1.default.sign({
        user_id: user_id,
        email: email,
    }, secret, {
        expiresIn: expTokenTime,
    });
    const refreshToken = (0, uuid_1.v4)();
    const tokens = {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
    return tokens;
}
exports.default = getTokens;
