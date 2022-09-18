"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hashSchema = new mongoose_1.default.Schema({
    shortLink: {
        type: String,
        required: true,
    },
    longLink: {
        type: String,
        required: true,
    },
});
const Hash = mongoose_1.default.model("Hash", hashSchema);
exports.default = Hash;
