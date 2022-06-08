"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFromDb = exports.saveToDB = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const writeFilePromise = util_1.default.promisify(fs_1.writeFile);
const readFilePromise = util_1.default.promisify(fs_1.readFile);
async function saveToDB(string) {
    try {
        await writeFilePromise(path_1.default.join(__dirname, 'db.txt'), string, 'utf8');
    }
    catch (err) {
        console.log(err);
    }
}
exports.saveToDB = saveToDB;
async function readFromDb() {
    try {
        const data = await readFilePromise(path_1.default.join(__dirname, 'db.txt'), 'utf-8');
        return data;
    }
    catch (err) {
        console.log(err);
    }
}
exports.readFromDb = readFromDb;
