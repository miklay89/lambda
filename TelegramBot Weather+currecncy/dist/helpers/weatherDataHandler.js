"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlySixHoursForecast = exports.onlyThreeHoursForecast = void 0;
function weatherDataPrettier(data) {
    const listOfWeatherByHours = data.list;
    const resultArr = [];
    listOfWeatherByHours.forEach((el, i) => {
        const shift = '\r\n';
        const date = new Date(+el.dt * 1000);
        const dayName = insertDayName(date);
        const monthName = insertMonthName(date);
        const dayDate = insertDayDate(date);
        if (i == 0) {
            resultArr.push(`Daily forecast in Madrid:`);
            resultArr.push(`${shift}${dayName}, ${dayDate} of ${monthName}:`);
        }
        const hour = date.getUTCHours().toString().padStart(2, '0');
        if (+hour === 0) {
            resultArr.push(`${shift}${dayName}, ${dayDate} of ${monthName}:`);
        }
        const temp = Math.trunc(el.main.temp);
        const feelsLikeTemp = Math.trunc(el.main.feels_like);
        const description = el.weather[0].description;
        const forecast = `  ${hour}:00, temperature is - ${temp}°C, feels like - ${feelsLikeTemp}°C, ${description}`;
        resultArr.push(forecast);
    });
    return resultArr;
}
exports.default = weatherDataPrettier;
function insertDayName(timestamp) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[timestamp.getDay()];
    return day;
}
function insertMonthName(timestamp) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[timestamp.getMonth()];
    return monthName;
}
function insertDayDate(timestamp) {
    const day = timestamp.getDate();
    return day;
}
function onlyThreeHoursForecast(arr) {
    const shift = '\r\n';
    const array = checkEmptyForecastDay(arr);
    const result = array.join(shift);
    return result;
}
exports.onlyThreeHoursForecast = onlyThreeHoursForecast;
function onlySixHoursForecast(arr) {
    const shift = '\r\n';
    const resultFiltered = arr.filter(element => {
        const hour = element.slice(2, 4);
        if (hour == '03')
            return false;
        if (hour == '09')
            return false;
        if (hour == '15')
            return false;
        if (hour == '21')
            return false;
        return true;
    });
    const array = checkEmptyForecastDay(resultFiltered);
    const result = array.join(shift);
    return result;
}
exports.onlySixHoursForecast = onlySixHoursForecast;
function checkEmptyForecastDay(arr) {
    if (arr[2].length < 35) {
        arr.splice(1, 1);
        return arr;
    }
    return arr;
}
