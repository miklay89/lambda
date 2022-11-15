import { expect, test } from "@jest/globals";
import { calcPrice, calcTime, calcDeadline } from "./logic";

// calcPrice() TESTS

// minimal price
test("Should be 50", () => {
  expect(calcPrice("ua", "doc", 10)).toBe(50);
});
test("Should be 50", () => {
  expect(calcPrice("ru", "doc", 10)).toBe(50);
});
test("Should be 120", () => {
  expect(calcPrice("en", "doc", 10)).toBe(120);
});

// minimal price + other doc type
test("Should be - 144", () => {
  expect(calcPrice("en", "other", 10)).toBe(144);
});
test("Should be - 60", () => {
  expect(calcPrice("ua", "other", 10)).toBe(60);
});
test("Should be - 60", () => {
  expect(calcPrice("ru", "other", 10)).toBe(60);
});

// no lang - error
test("Should be - 'Language error'", () => {
  expect(calcPrice("", "doc", 10)).toBe("Language error");
});
test("Should be - 'Language error'", () => {
  expect(calcPrice("", "other", 10)).toBe("Language error");
});

// various price and doc type
test("Should be 250", () => {
  expect(calcPrice("ua", "doc", 5000)).toBe(250);
});
test("Should be 3750", () => {
  expect(calcPrice("ru", "docx", 75000)).toBe(3750);
});
test("Should be 300", () => {
  expect(calcPrice("en", "doc", 2500)).toBe(300);
});
test("Should be 360", () => {
  expect(calcPrice("en", "other", 2500)).toBe(360);
});

// no doc type - error
test("Should be - 'Doctype error'", () => {
  expect(calcPrice("ua", "", 10000)).toBe("Doctype error");
});
test("Should be - 'Doctype error'", () => {
  expect(calcPrice("ru", "", 10000)).toBe("Doctype error");
});
test("Should be - 'Doctype error'", () => {
  expect(calcPrice("en", "", 10000)).toBe("Doctype error");
});

// calcTime() TESTS
// minimal price
test("Should be 3600000", () => {
  expect(calcTime("ua", "doc", 10)).toBe(3600000);
});
test("Should be 3600000", () => {
  expect(calcTime("ru", "doc", 10)).toBe(3600000);
});
test("Should be 3600000", () => {
  expect(calcTime("en", "doc", 10)).toBe(3600000);
});

// minimal price + other doc type
test("Should be 4320000", () => {
  expect(calcTime("ua", "other", 10)).toBe(4320000);
});
test("Should be 4320000", () => {
  expect(calcTime("ru", "other", 10)).toBe(4320000);
});
test("Should be 4320000", () => {
  expect(calcTime("en", "other", 10)).toBe(4320000);
});

// no lang - error
test("Should be - 'Language error'", () => {
  expect(calcTime("", "doc", 10)).toBe("Language error");
});
test("Should be - 'Language error'", () => {
  expect(calcTime("", "other", 10)).toBe("Language error");
});

// various price and doc type
test("Should be 15303375.843960991", () => {
  expect(calcTime("ua", "doc", 5000)).toBe(15303375.843960991);
});
test("Should be 204350637.65941486", () => {
  expect(calcTime("ru", "docx", 75000)).toBe(204350637.65941486);
});
test("Should be 28827027.027027026", () => {
  expect(calcTime("en", "doc", 2500)).toBe(28827027.027027026);
});
test("Should be 391057224.3060765", () => {
  expect(calcTime("ua", "other", 120000)).toBe(391057224.3060765);
});
test("Should be 157835675.6756757", () => {
  expect(calcTime("en", "other", 12000)).toBe(157835675.6756757);
});

// no doc type - error
test("Should be 391057224", () => {
  expect(calcTime("ua", "", 120000)).toBe("Doctype error");
});

// calcDeadline() TESTS

// before working time
// date: Tue Nov 15 2022 05:00:00 GMT+0000
// timestamp: 1668488400
// time for task in hours: 1
// time for task in ms: 3600000
test("Should be JSON-STRING", () => {
  expect(JSON.stringify(calcDeadline(3600000, 1668488400000))).toBe(
    '{"deadlineTimestamp":1668589200000,"deadlineDate":"16/11/2022 9:0:0"}'
  );
});

// working time
// date: Tue Nov 15 2022 16:00:00 GMT+0000
// timestamp: 1668528000000
// time for task in hours: 1
// time for task: 3600000
test("Should be JSON-STRING", () => {
  expect(JSON.stringify(calcDeadline(3600000, 1668528000000))).toBe(
    '{"deadlineTimestamp":1668531600000,"deadlineDate":"15/11/2022 17:0:0"}'
  );
});

// swap for next day (end of the working day - to next working day)
// date: Tue Nov 15 2022 16:30:00 GMT+0000
// timestamp: 1668529800000
// time for task in hours: 2
// time for task: 7200000
test("Should be JSON-STRING", () => {
  expect(JSON.stringify(calcDeadline(7200000, 1668529800000))).toBe(
    '{"deadlineTimestamp":1668591000000,"deadlineDate":"16/11/2022 9:30:0"}'
  );
});

// after working time (end of the day - to next working day)
// date: Tue Nov 15 2022 20:00:00 GMT+0000
// timestamp: 1668542400000
// time for task in hours: 1
// time for task: 3600000
test("Should be JSON-STRING", () => {
  expect(JSON.stringify(calcDeadline(3600000, 1668542400000))).toBe(
    '{"deadlineTimestamp":1668589200000,"deadlineDate":"16/11/2022 9:0:0"}'
  );
});

// friday night
// date: Fri Nov 18 2022 20:00:00 GMT+0000
// timestamp: 1668801600000
// time for task in hours: 1
// time for task: 3600000
test("Should be JSON-STRING", () => {
  expect(JSON.stringify(calcDeadline(3600000, 1668801600000))).toBe(
    '{"deadlineTimestamp":1669021200000,"deadlineDate":"21/11/2022 9:0:0"}'
  );
});

// saturday
// date: Sat Nov 19 2022 09:00:00 GMT+0000
// timestamp: 1668848400
// time for task in hours: 1
// time for task: 3600000
test("Should be JSON-STRING", () => {
  expect(JSON.stringify(calcDeadline(3600000, 1668848400000))).toBe(
    '{"deadlineTimestamp":1669021200000,"deadlineDate":"21/11/2022 9:0:0"}'
  );
});

// sunday
// date: Sun Nov 20 2022 12:00:00 GMT+0000
// timestamp: 1668945600000
// time for task in hours: 1
// time for task: 3600000
test("Should be JSON-STRING", () => {
  expect(JSON.stringify(calcDeadline(3600000, 1668945600000))).toBe(
    '{"deadlineTimestamp":1669021200000,"deadlineDate":"21/11/2022 9:0:0"}'
  );
});
