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
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const axios_1 = __importDefault(require("axios"));
const readFilePromise = util_1.default.promisify(fs_1.default.readFile);
// getting array of urls
function getFromFileUrls(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield readFilePromise(url, "utf8");
            const urlsArr = data.split("\n");
            return urlsArr;
        }
        catch (err) {
            if (err instanceof Error)
                console.log(err.message);
            return null;
        }
    });
}
// sending requests to url
function getDataFromUrl(url, countAttempt) {
    return __awaiter(this, void 0, void 0, function* () {
        if (countAttempt === 3) {
            return { data: null, message: "Invalid request", url };
        }
        try {
            const response = yield axios_1.default.get(url);
            return { data: response.data, message: "Valid request", url };
        }
        catch (err) {
            // if(err instanceof Error) console.log(err.message);
            countAttempt++;
            return getDataFromUrl(url, countAttempt);
        }
    });
}
function findKeyAndValueInObject(obj) {
    let isDone = null;
    if (!obj.data)
        return { url: obj.url, message: obj.message, isDone: null };
    const objStringify = JSON.stringify(obj.data);
    if (objStringify.includes(`"isDone":false`))
        isDone = false;
    if (objStringify.includes(`"isDone":true`))
        isDone = true;
    return { url: obj.url, message: obj.message, isDone };
}
function getDataFromResponse(response) {
    const mappedData = [];
    response.map((element) => {
        mappedData.push(findKeyAndValueInObject(element));
    });
    return mappedData;
}
function showDataFromRequests(data) {
    const invalidRequests = data.filter((elem) => elem.isDone == null);
    const validRequest = data.filter((elem) => typeof elem.isDone === "boolean");
    if (Array.isArray(invalidRequests)) {
        invalidRequests.forEach(element => {
            console.log(`Invalid request to: ${element.url}`);
        });
    }
    if (Array.isArray(validRequest)) {
        validRequest.forEach(element => {
            console.log(`Request to: ${element.url}, isDone: ${element.isDone}`);
        });
        console.log(`isDone: true - ${validRequest.filter(e => e.isDone === true).length}`);
        console.log(`isDone: false - ${validRequest.filter(e => e.isDone === false).length}`);
    }
}
function init(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // start of calculation timer
        const starTimer = Date.now();
        const urls = yield getFromFileUrls(url);
        if (!urls)
            return;
        let promisesArr = [];
        urls.forEach((url) => promisesArr.push(getDataFromUrl(url, 0)));
        yield Promise.all(promisesArr)
            .then((res) => getDataFromResponse(res))
            .then((res) => showDataFromRequests(res));
        // end of calculation timer
        const endTimer = Date.now();
        console.log(`Requests are made for ${(endTimer - starTimer) / 1000} seconds.`);
    });
}
init(path_1.default.join(__dirname, "..", "url.txt"));
