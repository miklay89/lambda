"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonDataStorage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonStorageSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    data: { type: Object, required: true }
});
exports.jsonDataStorage = mongoose_1.default.model('jsonDataStorage', jsonStorageSchema);
