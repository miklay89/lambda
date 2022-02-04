const priceRuUa = 0.05;
const priceEng = 0.12;
const startingHour = [8, 0, 0];
const endingHour = [17, 0, 0];

let lang,
    mimetype,
    count;

const dateNow = Date.now();

function calcPrice(lang, mimetype, count) {
  let totalPrice = 0;
  if (count) {
    switch (lang) {
      case "ru":
      case "ua":
        totalPrice = priceRuUa * count;
        if (totalPrice < 50) totalPrice = 50;
        break;
      case "en":
        totalPrice = priceEng * count;
        if (totalPrice < 120) totalPrice = 120;
        break;
      default:
        totalPrice = "Language error";
    }

    switch(mimetype) {
      case "doc":
      case "docx":
      case "rtf":
        return totalPrice;
      case "":
        if(totalPrice === "Language error") {
          return totalPrice;
        } else {
          totalPrice = "Doctype error";
        }
        break;
      default:
        if(totalPrice === "Language error") {
          return totalPrice;
        } else {
          totalPrice = totalPrice * 1.2;
        }
    }
  } else {
    return;
  }

  return totalPrice;
}

function calcTime(lang, mimetype, count) {
  let totalTime = 0;
  if (count) {
    switch (lang) {
      case "ru":
      case "ua":
        totalTime = Math.round(1800000 + (3600000 * (count / 1333)));
        if (totalTime < 3600000) totalTime = 3600000;
        break;
      case "en":
        totalTime = Math.round(1800000 + (3600000 * (count / 333)));
        if (totalTime < 3600000) totalTime = 3600000;
        break;
      default:
        totalTime = "Language error";
    }

    switch(mimetype) {
      case "doc":
      case "docx":
      case "rtf":
        return totalTime;
      case "":
        if(totalTime === "Language error") {
          return totalTime;
        } else {
          totalTime = totalTime * 1.2;
        }
        break;
      default:
        if(totalTime === "Language error") {
          return totalTime;
        } else {
          totalTime = totalTime * 1.2;
        }
    }
  } else {
    return;
  }

  return totalTime;
}

function calcDeadline(lang, mimetype, count, date) {
  // time to do task in ms
  let deadline = 0;
  let timeToDo = calcTime(lang, mimetype, count);

  if (timeToDo === "Language error") {
    deadline = "Language error";
    return deadline;
  }
  
  // текущая дата в мс
  let dateNow = date;

  // проверка дня недели, входящяя дата в мс
  // если суббота или воскресенье, то возвращаем дату понедельника 10 утра
  // иначе возвращаем текущую дату
  function checkDay(date) {
    date = new Date(date);
    const curDay = date.getUTCDay();
    if (curDay === 6) {
      date.setUTCDate(date.getUTCDate() + 2);
      date.setUTCHours(...startingHour);
      return date.getTime();
    }
    if (curDay === 0) {
      date.setUTCDate(date.getUTCDate() + 1);
      date.setUTCHours(...startingHour);
      return date.getTime();
    }
    return date.getTime();
  }

  // проверяем время, входящяя дата в мс
  // если рабочее время то возвращаем текущую дату в мс
  // если до начала дня, то возвращаем текущий день 10 утра в мс
  // если конец рабочего дня (попадет только пятница), возврщаем понедельник 10 утра в мс
  function checkWorkingTime(date) {
    date = new Date(date);
    const curHour = date.getUTCHours();
    if (curHour >= startingHour[0] && curHour < endingHour[0]) return date.getTime();
    if (curHour < startingHour[0]) {
      date.setUTCHours(...startingHour);
      return date.getTime();
    }
    if (curHour >= endingHour[0]) {
      date.setUTCDate(date.getUTCDate() + 3);
      date.setUTCHours(...startingHour);
      return date.getTime();
    }
  }

  // считаем время до конца рабочего дня, входящяя дата в мс
  // возвращает кол-во мс до конца рабочего времени
  function timeToEnding(date) {
    date = new Date(date);
    const curTime = date.getTime();
    const endOfDay = date.setUTCHours(...endingHour);
    return endOfDay - curTime;
  }

  function shifDay(date) {
    date = new Date(date);
    date.setUTCDate(date.getUTCDate() + 1);
    date.setUTCHours(...startingHour);
    return date.getTime();
  }
  
  dateNow = checkDay(dateNow);
  dateNow = checkWorkingTime(dateNow);


  while (timeToDo != 0) {
    if (timeToEnding(dateNow) > timeToDo) {
      deadline = dateNow + timeToDo;
      // console.log("Конец", (new Date (deadline)).toString());
      timeToDo = 0;
    } else {
      timeToDo = timeToDo - timeToEnding(dateNow);
      dateNow = shifDay(dateNow);
      dateNow = checkDay(dateNow);
    }
  }

  return deadline;
}

module.exports = {calcPrice, calcTime, calcDeadline};