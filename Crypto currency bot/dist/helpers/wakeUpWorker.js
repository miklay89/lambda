"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const getListRecent_1 = __importDefault(require("../controllers/getListRecent"));
dotenv_1.default.config();
const awakeWorker = setInterval(async () => {
    let response = await (0, getListRecent_1.default)();
    response = "";
    console.log(`Response now - ${response}`);
}, 1740000);
exports.default = awakeWorker;
