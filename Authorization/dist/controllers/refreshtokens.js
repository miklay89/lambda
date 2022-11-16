"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../db"));
const gettokens_1 = __importDefault(require("../helpers/gettokens"));
dotenv_1.default.config();
const tokenSecret = process.env.TOKEN_SECRET;
const refreshTokens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization)
            return res.status(401).json({ message: "Invalid Token." });
        const bearerHeader = req.headers.authorization;
        const bearer = bearerHeader.split(" ");
        const refreshToken = bearer[1];
        yield db_1.default.connect();
        const sessionsCollection = db_1.default.sessionsCollection();
        const session = yield sessionsCollection.findOne({
            refreshToken: refreshToken,
        });
        if (!session)
            return res.status(401).json({ message: "Invalid Token." });
        const usersCollection = db_1.default.usersCollection();
        const user = yield usersCollection.findOne({ _id: session.userId });
        if (!user)
            return res.status(401).json({ message: "Invalid Token." });
        const newTokens = (0, gettokens_1.default)(user.user_id, user.email, tokenSecret);
        // time of expiration - 48h
        const newRefreshTokenExpTime = Math.floor(Date.now() + 172800000);
        // update session in DB
        const newSession = {
            $set: {
                refreshToken: newTokens.refreshToken,
                expiresIn: newRefreshTokenExpTime,
            },
        };
        yield sessionsCollection.updateOne({ refreshToken: refreshToken }, newSession);
        db_1.default.closeConnection();
        return res.json({ tokens: newTokens });
    }
    catch (err) {
        if (err instanceof Error)
            console.log(err.message);
    }
});
exports.default = refreshTokens;
