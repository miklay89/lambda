"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const storagemodel_1 = __importDefault(require("./models/storagemodel"));
dotenv_1.default.config();
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const dbObject = {
    connect: async () => {
        try {
            await mongoose_1.default.connect(MONGO_DB_URI);
        }
        catch (err) {
            if (err instanceof Error)
                console.log(err.message);
        }
    },
    closeConnection: () => {
        mongoose_1.default.disconnect();
    },
    save: async (id, data) => {
        try {
            const dataForSaving = new storagemodel_1.default({ id: id, data: data });
            await dataForSaving.save();
        }
        catch (err) {
            if (err instanceof Error)
                console.log(err.message);
        }
    },
};
exports.default = dbObject;
