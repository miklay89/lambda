const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);

async function getJSONData(path) {
  const data = await readFilePromise(path, 'utf8');
  return JSON.parse(data);
}

async function start (path) {
  const data = await getJSONData(path);
  // console.log(data);
  const preatyData = groupData(data);
  console.log(preatyData);
  
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
}

function groupData(arr) {
  // geting users ID's (uniq)
  const userIds = arr.map(item => item.user._id)
  .filter((value, index, arr) => arr.indexOf(value) === index);
  // console.log(userIds);
  const sorted = [];
  userIds.forEach(element => {
    const data = arr.filter(item => item.user._id === element);

    if(data.length > 1) {
      const userId = data[0].user._id;
      const name = data[0].user.name;
      const weekendDates =[];
      data.forEach(item => {
        const data = {startDate: item.startDate, endDate: item.endDate};
        weekendDates.push(data);
      });
      const preatyData = {userId, name, weekendDates};
      sorted.push(preatyData);

    } else {
      const userId = data[0].user._id;
      const name = data[0].user.name;
      const weekendDates =[];
      weekendDates.push({startDate: data[0].startDate, endDate: data[0].endDate});
      const preatyData = {userId, name, weekendDates};
      sorted.push(preatyData);
    }
  });

  return sorted;
}

start('./json.txt');