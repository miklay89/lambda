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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const readFilePromise = util_1.default.promisify(fs_1.default.readFile);
function getJSONData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield readFilePromise(url, "utf8");
            return JSON.parse(data);
        }
        catch (err) {
            if (err instanceof Error)
                console.log(err.message);
            return null;
        }
    });
}
function groupData(arr) {
    // geting users ID's (uniq)
    const userIds = arr
        .map((item) => item.user._id)
        .filter((value, index, arr) => arr.indexOf(value) === index);
    // console.log(userIds);
    const sortedAndGroupedData = [];
    userIds.forEach((element) => {
        const filteredDataById = arr.filter((item) => item.user._id === element);
        if (filteredDataById.length > 1) {
            const userId = filteredDataById[0].user._id;
            const name = filteredDataById[0].user.name;
            const weekendDates = [];
            filteredDataById.forEach((item) => {
                const weekendDatesData = { startDate: item.startDate, endDate: item.endDate };
                weekendDates.push(weekendDatesData);
            });
            const groupedData = { userId, name, weekendDates };
            sortedAndGroupedData.push(groupedData);
        }
        else {
            const userId = filteredDataById[0].user._id;
            const name = filteredDataById[0].user.name;
            const weekendDates = [];
            weekendDates.push({
                startDate: filteredDataById[0].startDate,
                endDate: filteredDataById[0].endDate,
            });
            const groupedData = { userId, name, weekendDates };
            sortedAndGroupedData.push(groupedData);
        }
    });
    return sortedAndGroupedData;
}
function start(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getJSONData(url);
        if (!data)
            return;
        // console.log(data);
        const groupedData = groupData(data);
        console.log(groupedData);
        /* одинаковых юзеров может быть несколько,
        надо учесть чтоб при повторе в JSON-не
        просто добавлялись только выходные пуш
        на выходе должен быть объект следующего вида
        {
          userId: user_id,
          name: name,
          weekendDates: [{startDate: "date", endDate: "date"},
          "еще объект, если есть отпуска в JSON"]}
        */
    });
}
start(path_1.default.join(__dirname, "..", "json.txt"));
