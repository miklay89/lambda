const priceRuUa = 0.05;
const priceEng = 0.12;
// UTC hours +0
const startingHour = 8;
const endingHour = 17;

export function calcPrice(
  language: string,
  mimetype: string,
  count: number
): number | string {
  let totalPrice: string | number = 0;

  switch (true) {
    case language == "ru":
    case language == "ua":
      totalPrice = priceRuUa * count;
      if (totalPrice < 50) totalPrice = 50;
      break;
    case language == "en":
      totalPrice = priceEng * count;
      if (totalPrice < 120) totalPrice = 120;
      break;
    default:
      totalPrice = "Language error";
  }

  if (typeof totalPrice === "string") return totalPrice;

  switch (true) {
    case mimetype == "doc":
    case mimetype == "docx":
    case mimetype == "rtf":
      return totalPrice;
    case mimetype == "other":
      totalPrice = totalPrice * 1.2;
      return totalPrice;
    default:
      totalPrice = "Doctype error";
      return totalPrice;
  }
}

export function calcTime(
  language: string,
  mimetype: string,
  count: number
): number | string {
  let totalTime: number | string = 0;
  switch (true) {
    case language == "ru":
    case language == "ua":
      totalTime = (1800000 + 3600000 * (count / 1333));
      if (totalTime < 3600000) totalTime = 3600000;
      break;
    case language == "en":
      totalTime = (1800000 + 3600000 * (count / 333));
      if (totalTime < 3600000) totalTime = 3600000;
      break;
    default:
      totalTime = "Language error";
  }

  if (typeof totalTime === "string") return totalTime;

  switch (true) {
    case mimetype == "doc":
    case mimetype == "docx":
    case mimetype == "rtf":
      break;
    case mimetype == "other":
      totalTime = totalTime * 1.2;
      break;
    default:
      totalTime = "Doctype error";
  }
  return totalTime;
}

function isWorkingHours(date: number): boolean {
  const dateForCheck = new Date(date);
  const curHour = dateForCheck.getUTCHours();
  if (curHour >= startingHour && curHour < endingHour) return true;
  return false;
}

function isWorkingDay(date: number): boolean {
  const dateForCheck = new Date(date);
  const curDay = dateForCheck.getUTCDay();
  // 6 - saturday, 0 - sunday
  if (curDay === 6 || curDay === 0) return false;
  return true;
}

function shiftDayAndSetWorkingHour(date: number): number {
  let shiftedDate = new Date(date);
  shiftedDate.setUTCDate(shiftedDate.getUTCDate() + 1);
  shiftedDate.setUTCHours(startingHour, 0, 0);
  return shiftedDate.getTime();
}

function calcTimeInMSForTheEndOfTheDay(date: number): number {
  const checkedDate = new Date(date);
  const curTime = checkedDate.getTime();
  const endOfDay = checkedDate.setUTCHours(endingHour, 0, 0);
  return endOfDay - curTime;
}

interface ICalcDeadline {
  deadlineTimestamp: number;
  deadlineDate: string;
}

export function calcDeadline(
  timeForWorkInMS: number,
  dateNow: number
): ICalcDeadline {
  let deadlineTimestamp: number = 0;
  let deadlineDate: string = "";

  while (timeForWorkInMS != 0) {
    if (!isWorkingDay(dateNow)) {
      dateNow = shiftDayAndSetWorkingHour(dateNow);
      continue;
    }
    if (!isWorkingHours(dateNow)) {
      dateNow = shiftDayAndSetWorkingHour(dateNow);
      continue;
    }
    if (timeForWorkInMS <= calcTimeInMSForTheEndOfTheDay(dateNow)) {
      deadlineTimestamp = dateNow + timeForWorkInMS;
      deadlineDate =
        new Date(deadlineTimestamp).getUTCDate() +
        "/" +
        (new Date(deadlineTimestamp).getUTCMonth() + 1) +
        "/" +
        new Date(deadlineTimestamp).getUTCFullYear() +
        " " +
        new Date(deadlineTimestamp).getUTCHours() +
        ":" +
        new Date(deadlineTimestamp).getUTCMinutes() +
        ":" +
        new Date(deadlineTimestamp).getUTCSeconds();
      break;
    }
    timeForWorkInMS = timeForWorkInMS - calcTimeInMSForTheEndOfTheDay(dateNow);
    dateNow = shiftDayAndSetWorkingHour(dateNow);
  }
  return { deadlineTimestamp, deadlineDate };
}
