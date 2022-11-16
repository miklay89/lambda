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
dotenv_1.default.config();
const tokenSecret = process.env.TOKEN_SECRET;
// sign up
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password)
            return res
                .status(400)
                .json({ message: "Email and password is required." });
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        yield db_1.default.connect();
        const usersCollection = db_1.default.usersCollection();
        const userExist = yield usersCollection.findOne({ email: email });
        if (userExist) {
            return res.status(200).json({ message: "User is exist" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = {
            email: email,
            password: hashedPassword,
        };
        yield usersCollection.insertOne(user);
        db_1.default.closeConnection();
        return res.status(200).json({ message: "User is registered." });
    }
    catch (err) {
        if (err instanceof Error)
            console.log(err.message);
    }
});
exports.default = signUp;
