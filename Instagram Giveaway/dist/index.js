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
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
// const dirPath = path.join(__dirname, '200k_words_100x100');
const dirPath = path_1.default.join(__dirname, "..", "2kk_words_400x400");
// reading filenames in dir
function readFileNames(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield promises_1.default.readdir(url);
            return data;
        }
        catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
            return null;
        }
    });
}
function readFileContentToArr(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield promises_1.default.readFile(path_1.default.join(url), "utf-8");
        const stringsArr = data.split("\n");
        return stringsArr;
    });
}
// dictionary
function createDictionary(arr) {
    const dictionary = {};
    arr.map((item) => {
        if (item in dictionary) {
            dictionary[item]++;
        }
        else {
            dictionary[item] = 1;
        }
    });
    return dictionary;
}
// Uniq in all files
function uniqueValues(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // start of calculation timer
        const starTimer = Date.now();
        const fileNames = yield readFileNames(url);
        if (!fileNames)
            return;
        const promiseArr = [];
        fileNames.forEach((file) => {
            promiseArr.push(readFileContentToArr(path_1.default.join(url, file)));
        });
        yield Promise.all(promiseArr)
            .then((item) => item.map((item) => createDictionary(item)))
            .then((result) => {
            const countUniqPhrases = result
                .map((item) => Object.keys(item).length)
                .reduce((prev, next) => prev + next);
            console.log(`Unique phrases in all files: ${countUniqPhrases}`);
            // end of calculation timer
            const endTimer = Date.now();
            console.log(`Unique phrases in all files counted for ${(endTimer - starTimer) / 1000} seconds.`);
        });
    });
}
uniqueValues(dirPath);
// Count all exist phrases in all files
function existInAllFiles(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // start of calculation timer
        const starTimer = Date.now();
        const fileNames = yield readFileNames(url);
        if (!fileNames)
            return;
        const promiseArr = [];
        fileNames.forEach((file) => {
            promiseArr.push(readFileContentToArr(path_1.default.join(url, file)));
        });
        yield Promise.all(promiseArr).then((result) => {
            const countAllPhrases = result
                .map((item) => Object.keys(item).length)
                .reduce((prev, next) => prev + next);
            console.log(`All phrases in all files: ${countAllPhrases}`);
            // end of calculation timer
            const endTimer = Date.now();
            console.log(`All phrases in all files counted for ${(endTimer - starTimer) / 1000} seconds.`);
        });
    });
}
existInAllFiles(dirPath);
// Count phrases at least at ten files
function existInAtLeastTen(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // start of calculation timer
        const starTimer = Date.now();
        const fileNames = yield readFileNames(url);
        if (!fileNames)
            return;
        const promiseArr = [];
        fileNames.forEach((file) => {
            promiseArr.push(readFileContentToArr(path_1.default.join(url, file)));
        });
        yield Promise.all(promiseArr)
            .then((items) => items.map((item) => createDictionary(item)))
            .then((arrOfDictionaries) => arrOfDictionaries.map((item) => Object.keys(item)))
            .then((arrOfStringsArrays) => {
            const unwrappedArr = [];
            arrOfStringsArrays.map((item) => unwrappedArr.push(...item));
            return unwrappedArr;
        })
            .then((unwrappedArr) => createDictionary(unwrappedArr))
            .then((dictionary) => {
            const countAtLeastInTenFiles = Object.values(dictionary).filter((element) => element >= 10).length;
            console.log(`Phrases at least in 10 files: ${countAtLeastInTenFiles}`);
            // end of calculation timer
            const endTimer = Date.now();
            console.log(`Phrases at least in 10 files counted for ${(endTimer - starTimer) / 1000} seconds.`);
        });
    });
}
existInAtLeastTen(dirPath);
