const {calcPrice, calcTime, calcDeadline} = require("./logic");

// calcPrice
test ("Should be 50", () => {
  expect (calcPrice("ua", "doc", 10)).toBe(50);
});
test ("Should be 50", () => {
  expect (calcPrice("ru", "doc", 10)).toBe(50);
});
test ("Should be 120", () => {
  expect (calcPrice("en", "doc", 10)).toBe(120);
});
test ("Should be - 'Language error'", () => {
  expect (calcPrice("", "doc", 10)).toBe("Language error");
});
test ("Should be 250", () => {
  expect (calcPrice("ua", "doc", 5000)).toBe(250);
});
test ("Should be 3750", () => {
  expect (calcPrice("ru", "docx", 75000)).toBe(3750);
});
test ("Should be 300", () => {
  expect (calcPrice("en", "doc", 2500)).toBe(300);
});
test ("Should be - 'Doctype error'", () => {
  expect (calcPrice("ua", "", 10000)).toBe("Doctype error");
});

// calcTime
test ("Should be 3600000", () => {
  expect (calcTime("ua", "doc", 10)).toBe(3600000);
});
test ("Should be 3600000", () => {
  expect (calcTime("ru", "doc", 10)).toBe(3600000);
});
test ("Should be 3600000", () => {
  expect (calcTime("en", "doc", 10)).toBe(3600000);
});
test ("Should be - 'Language error'", () => {
  expect (calcTime("", "doc", 10)).toBe("Language error");
});
test ("Should be 15303376", () => {
  expect (calcTime("ua", "doc", 5000)).toBe(15303376);
});
test ("Should be 204350638", () => {
  expect (calcTime("ru", "docx", 75000)).toBe(204350638);
});
test ("Should be 28827027", () => {
  expect (calcTime("en", "doc", 2500)).toBe(28827027);
});
test ("Should be 391057224", () => {
  expect (calcTime("ua", "", 120000)).toBe(391057224);
});

// calcDeadline
// weekends
// 1642824000000 - 01.22.2022 06:00:00
test ("Should be 1643014800000", () => {
  expect (calcDeadline("ua", "doc", 10, 1642824000000)).toBe(1643014800000);
});

// 1642932000000 - 01.23.2022 12:00:00
test ("Should be 1643014800000", () => {
  expect (calcDeadline("ru", "rtf", 10, 1642932000000)).toBe(1643014800000);
});

// 1642964400000 - 01.23.2022 21:00:00
test ("Should be 1643015520000", () => {
  expect (calcDeadline("ua", "", 10, 1642964400000)).toBe(1643015520000);
});

// workingday
// 1643242384000 - 01.27.2022 02:13:04
test ("Should be 1643373405912", () => {
  expect (calcDeadline("ua", "", 14455, 1643242384000)).toBe(1643373405912);
});

// 1643191073000 - 01.26.2022 11:57:53
test ("Should be 1643791943270", () => {
  expect (calcDeadline("en", "docx", 14455, 1643191073000)).toBe(1643791943270);
});

// 1643303647000 - 01.27.2022 19:14:07
test ("Should be 1645114948987", () => {
  expect (calcDeadline("ru", "docx", 178455, 1643303647000)).toBe(1645114948987);
});

// friday
// 1641676327000 - 01.07.2022 23:12:07
test ("Should be 1642431659459", () => {
  expect (calcDeadline("en", "docx", 17155, 1641676327000)).toBe(1642431659459);
});

// lang error
test ("Should be - 'Language error'", () => {
  expect (calcDeadline("", "docx", 17155, 1641676327000)).toBe("Language error");
});


/* тесты: 
calcPrice/calcTime:
- все виды языков: eng, ru, ua, без языка
- 4 вида документов doc, docx, rtf, ""
- минимальная стоимость (мало знаков);

- calcDeadline
- все тесты как с calcTime;
- тесты старта задачи (дата):
  - выходные (до рабочих часов, рабочий час, после рабочих часов);
  - рабочий день (до рабочих часов, рабочий час, после рабочих часов);
  - пятница (после рабочих часов);
*/