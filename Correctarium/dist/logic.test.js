"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const logic_1 = require("./logic");
// calcPrice() TESTS
// minimal price
(0, globals_1.test)("Should be 50", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("ua", "doc", 10)).toBe(50);
});
(0, globals_1.test)("Should be 50", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("ru", "doc", 10)).toBe(50);
});
(0, globals_1.test)("Should be 120", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("en", "doc", 10)).toBe(120);
});
// minimal price + other doc type
(0, globals_1.test)("Should be - 144", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("en", "other", 10)).toBe(144);
});
(0, globals_1.test)("Should be - 60", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("ua", "other", 10)).toBe(60);
});
(0, globals_1.test)("Should be - 60", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("ru", "other", 10)).toBe(60);
});
// no lang - error
(0, globals_1.test)("Should be - 'Language error'", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("", "doc", 10)).toBe("Language error");
});
(0, globals_1.test)("Should be - 'Language error'", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("", "other", 10)).toBe("Language error");
});
// various price and doc type
(0, globals_1.test)("Should be 250", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("ua", "doc", 5000)).toBe(250);
});
(0, globals_1.test)("Should be 3750", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("ru", "docx", 75000)).toBe(3750);
});
(0, globals_1.test)("Should be 300", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("en", "doc", 2500)).toBe(300);
});
(0, globals_1.test)("Should be 360", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("en", "other", 2500)).toBe(360);
});
// no doc type - error
(0, globals_1.test)("Should be - 'Doctype error'", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("ua", "", 10000)).toBe("Doctype error");
});
(0, globals_1.test)("Should be - 'Doctype error'", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("ru", "", 10000)).toBe("Doctype error");
});
(0, globals_1.test)("Should be - 'Doctype error'", () => {
    (0, globals_1.expect)((0, logic_1.calcPrice)("en", "", 10000)).toBe("Doctype error");
});
// calcTime() TESTS
// minimal price
(0, globals_1.test)("Should be 3600000", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("ua", "doc", 10)).toBe(3600000);
});
(0, globals_1.test)("Should be 3600000", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("ru", "doc", 10)).toBe(3600000);
});
(0, globals_1.test)("Should be 3600000", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("en", "doc", 10)).toBe(3600000);
});
// minimal price + other doc type
(0, globals_1.test)("Should be 4320000", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("ua", "other", 10)).toBe(4320000);
});
(0, globals_1.test)("Should be 4320000", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("ru", "other", 10)).toBe(4320000);
});
(0, globals_1.test)("Should be 4320000", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("en", "other", 10)).toBe(4320000);
});
// no lang - error
(0, globals_1.test)("Should be - 'Language error'", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("", "doc", 10)).toBe("Language error");
});
(0, globals_1.test)("Should be - 'Language error'", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("", "other", 10)).toBe("Language error");
});
// various price and doc type
(0, globals_1.test)("Should be 15303375.843960991", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("ua", "doc", 5000)).toBe(15303375.843960991);
});
(0, globals_1.test)("Should be 204350637.65941486", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("ru", "docx", 75000)).toBe(204350637.65941486);
});
(0, globals_1.test)("Should be 28827027.027027026", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("en", "doc", 2500)).toBe(28827027.027027026);
});
(0, globals_1.test)("Should be 391057224.3060765", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("ua", "other", 120000)).toBe(391057224.3060765);
});
(0, globals_1.test)("Should be 157835675.6756757", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("en", "other", 12000)).toBe(157835675.6756757);
});
// no doc type - error
(0, globals_1.test)("Should be 391057224", () => {
    (0, globals_1.expect)((0, logic_1.calcTime)("ua", "", 120000)).toBe("Doctype error");
});
// calcDeadline() TESTS
// before working time
// date: Tue Nov 15 2022 05:00:00 GMT+0000
// timestamp: 1668488400
// time for task in hours: 1
// time for task in ms: 3600000
(0, globals_1.test)("Should be JSON-STRING", () => {
    (0, globals_1.expect)(JSON.stringify((0, logic_1.calcDeadline)(3600000, 1668488400000))).toBe('{"deadlineTimestamp":1668589200000,"deadlineDate":"16/11/2022 9:0:0"}');
});
// working time
// date: Tue Nov 15 2022 16:00:00 GMT+0000
// timestamp: 1668528000000
// time for task in hours: 1
// time for task: 3600000
(0, globals_1.test)("Should be JSON-STRING", () => {
    (0, globals_1.expect)(JSON.stringify((0, logic_1.calcDeadline)(3600000, 1668528000000))).toBe('{"deadlineTimestamp":1668531600000,"deadlineDate":"15/11/2022 17:0:0"}');
});
// swap for next day (end of the working day - to next working day)
// date: Tue Nov 15 2022 16:30:00 GMT+0000
// timestamp: 1668529800000
// time for task in hours: 2
// time for task: 7200000
(0, globals_1.test)("Should be JSON-STRING", () => {
    (0, globals_1.expect)(JSON.stringify((0, logic_1.calcDeadline)(7200000, 1668529800000))).toBe('{"deadlineTimestamp":1668591000000,"deadlineDate":"16/11/2022 9:30:0"}');
});
// after working time (end of the day - to next working day)
// date: Tue Nov 15 2022 20:00:00 GMT+0000
// timestamp: 1668542400000
// time for task in hours: 1
// time for task: 3600000
(0, globals_1.test)("Should be JSON-STRING", () => {
    (0, globals_1.expect)(JSON.stringify((0, logic_1.calcDeadline)(3600000, 1668542400000))).toBe('{"deadlineTimestamp":1668589200000,"deadlineDate":"16/11/2022 9:0:0"}');
});
// friday night
// date: Fri Nov 18 2022 20:00:00 GMT+0000
// timestamp: 1668801600000
// time for task in hours: 1
// time for task: 3600000
(0, globals_1.test)("Should be JSON-STRING", () => {
    (0, globals_1.expect)(JSON.stringify((0, logic_1.calcDeadline)(3600000, 1668801600000))).toBe('{"deadlineTimestamp":1669021200000,"deadlineDate":"21/11/2022 9:0:0"}');
});
// saturday
// date: Sat Nov 19 2022 09:00:00 GMT+0000
// timestamp: 1668848400
// time for task in hours: 1
// time for task: 3600000
(0, globals_1.test)("Should be JSON-STRING", () => {
    (0, globals_1.expect)(JSON.stringify((0, logic_1.calcDeadline)(3600000, 1668848400000))).toBe('{"deadlineTimestamp":1669021200000,"deadlineDate":"21/11/2022 9:0:0"}');
});
// sunday
// date: Sun Nov 20 2022 12:00:00 GMT+0000
// timestamp: 1668945600000
// time for task in hours: 1
// time for task: 3600000
(0, globals_1.test)("Should be JSON-STRING", () => {
    (0, globals_1.expect)(JSON.stringify((0, logic_1.calcDeadline)(3600000, 1668945600000))).toBe('{"deadlineTimestamp":1669021200000,"deadlineDate":"21/11/2022 9:0:0"}');
});
