"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const keys_1 = __importDefault(require("../keys/keys"));
function default_1() {
    try {
        mongoose_1.default.connect(keys_1.default.MONGO_DB_URI, () => {
            console.log('Connected to database.');
        });
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = default_1;
