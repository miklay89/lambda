import fs from "fs";
import path from "path";
import util from "util";
const readFilePromise = util.promisify(fs.readFile);

interface IData {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  usedDays: number;
  startDate: string;
  endDate: string;
}

interface IWeekendDates {
  startDate: string;
  endDate: string;
}

interface IGropedData {
  userId: string;
  name: string;
  weekendDates: IWeekendDates[];
}

async function getJSONData(url: string): Promise<IData[] | null> {
  try {
    const data = await readFilePromise(url, "utf8");
    return JSON.parse(data);
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    return null;
  }
}

function groupData(arr: IData[]): IGropedData[] {
  // geting users ID's (uniq)
  const userIds = arr
    .map((item) => item.user._id)
    .filter((value, index, arr) => arr.indexOf(value) === index);
  // console.log(userIds);
  const sortedAndGroupedData: IGropedData[] = [];
  userIds.forEach((element) => {
    const filteredDataById = arr.filter((item) => item.user._id === element);

    if (filteredDataById.length > 1) {
      const userId = filteredDataById[0].user._id;
      const name = filteredDataById[0].user.name;
      const weekendDates: IWeekendDates[] = [];
      filteredDataById.forEach((item) => {
        const weekendDatesData = { startDate: item.startDate, endDate: item.endDate };
        weekendDates.push(weekendDatesData);
      });
      const groupedData = { userId, name, weekendDates };
      sortedAndGroupedData.push(groupedData);
    } else {
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

async function start(url: string): Promise<void> {
  const data = await getJSONData(url);
  if (!data) return;
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
}

start(path.join(__dirname, "..", "json.txt"));
