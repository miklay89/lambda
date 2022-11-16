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
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
const client = new mongodb_1.MongoClient(process.env.MONGO_DB_URI);
const dbObject = {
    connect: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield client.connect();
        }
        catch (err) {
            if (err instanceof Error)
                console.log(err.message);
        }
    }),
    usersCollection: () => {
        const usersCollection = client.db("auth").collection("users");
        return usersCollection;
    },
    sessionsCollection: () => {
        const sessionsCollection = client.db("auth").collection("sessions");
        return sessionsCollection;
    },
    closeConnection: () => {
        client.close();
    },
};
exports.default = dbObject;
// ctrl+c end conection with DB
// process.on("SIGINT", () => {
//   dbClient.close();
// });
