"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToken = exports.readToken = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const readFilePromise = util_1.default.promisify(fs_1.default.readFile);
const writeFilePromise = util_1.default.promisify(fs_1.default.writeFile);
async function readToken(path) {
    if (fs_1.default.existsSync(path)) {
        const content = await readFilePromise(path, 'utf-8');
        const data = JSON.parse(content);
        return data;
    }
    else {
        return false;
    }
}
exports.readToken = readToken;
async function saveToken(path, data) {
    const content = JSON.stringify(data);
    writeFilePromise(path, content);
}
exports.saveToken = saveToken;
