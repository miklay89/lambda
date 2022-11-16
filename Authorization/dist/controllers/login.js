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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../db"));
const gettokens_1 = __importDefault(require("../helpers/gettokens"));
dotenv_1.default.config();
const tokenSecret = process.env.TOKEN_SECRET;
// login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof req.query.email !== "string" ||
            typeof req.query.password !== "string") {
            return res
                .status(400)
                .json({ message: "Email and password is required." });
        }
        const email = req.query.email.toLowerCase();
        const password = req.query.password;
        // connect to DB
        yield db_1.default.connect();
        const usersCollection = db_1.default.usersCollection();
        const sessionsCollection = db_1.default.sessionsCollection();
        // try to find user in db
        const user = yield usersCollection.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Invalid User name" });
        }
        const passwordIsCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordIsCorrect) {
            return res.json({ message: "Password is incorrect." });
        }
        const tokens = (0, gettokens_1.default)(user.user_id, user.email, tokenSecret);
        // 48h
        const refreshTokenExpTime = Math.floor(Date.now() + 172800000);
        const session = {
            userId: user._id,
            refreshToken: tokens.refreshToken,
            expiresIn: refreshTokenExpTime,
        };
        yield sessionsCollection.insertOne(session);
        db_1.default.closeConnection();
        return res.json({ tokens });
    }
    catch (err) {
        if (err instanceof Error)
            console.log(err.message);
    }
});
exports.default = login;
