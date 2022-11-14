import path from "path";
import fs from "fs";
import util from "util";
import axios from "axios";

const readFilePromise = util.promisify(fs.readFile);

// getting array of urls
async function getFromFileUrls(url: string): Promise<string[] | null> {
  try {
    const data = await readFilePromise(url, "utf8");
    const urlsArr = data.split("\n");
    return urlsArr;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    return null;
  }
}

interface IResponse {
  data: object | null;
  message: string;
  url: string;
}

// sending requests to url
async function getDataFromUrl(
  url: string,
  countAttempt: number
): Promise<IResponse> {
  if (countAttempt === 3) {
    return { data: null, message: "Invalid request", url };
  }

  try {
    const response = await axios.get(url);
    return { data: response.data, message: "Valid request", url };
  } catch (err) {
    // if(err instanceof Error) console.log(err.message);
    countAttempt++;
    return getDataFromUrl(url, countAttempt);
  }
}

interface IFindKeyIsDone {
  url: string;
  message: string;
  isDone: null | boolean;
}

function findKeyAndValueInObject(obj: IResponse): IFindKeyIsDone {
  let isDone: boolean | null = null;
  if (!obj.data) return { url: obj.url, message: obj.message, isDone: null };
  const objStringify = JSON.stringify(obj.data);
  if (objStringify.includes(`"isDone":false`)) isDone = false;
  if (objStringify.includes(`"isDone":true`)) isDone = true;
  return { url: obj.url, message: obj.message, isDone };
}

function getDataFromResponse(response: IResponse[]): IFindKeyIsDone[] {
  const mappedData: IFindKeyIsDone[] = [];
  response.map((element) => {
    mappedData.push(findKeyAndValueInObject(element));
  });
  return mappedData;
}

function showDataFromRequests(data: IFindKeyIsDone[]): void {
  const invalidRequests = data.filter((elem) => elem.isDone == null);
  const validRequest = data.filter((elem) => typeof elem.isDone === "boolean");
  if(Array.isArray(invalidRequests)) {
    invalidRequests.forEach(element => {
      console.log(`Invalid request to: ${element.url}`);
    });
  }
  if(Array.isArray(validRequest)) {
    validRequest.forEach(element => {
      console.log(`Request to: ${element.url}, isDone: ${element.isDone}`);
    });
    console.log(`isDone: true - ${validRequest.filter(e => e.isDone === true).length}`)
    console.log(`isDone: false - ${validRequest.filter(e => e.isDone === false).length}`)
  }

}

async function init(url: string): Promise<void> {
  // start of calculation timer
  const starTimer = Date.now();

  const urls = await getFromFileUrls(url);
  if (!urls) return;
  let promisesArr: Array<Promise<IResponse>> = [];
  urls.forEach((url) => promisesArr.push(getDataFromUrl(url, 0)));
  await Promise.all(promisesArr)
    .then((res) => getDataFromResponse(res))
    .then((res) => showDataFromRequests(res));

  // end of calculation timer
  const endTimer = Date.now();
  console.log(
    `Requests are made for ${(endTimer - starTimer) / 1000} seconds.`
  );
}

init(path.join(__dirname, "..", "url.txt"));