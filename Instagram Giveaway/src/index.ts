import path from "path";
import fs from "fs/promises";
// const dirPath = path.join(__dirname, '200k_words_100x100');
const dirPath = path.join(__dirname, "..", "2kk_words_400x400");

// reading filenames in dir
async function readFileNames(url: string) {
  try {
    const data = await fs.readdir(url);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return null;
  }
}

async function readFileContentToArr(url: string) {
  const data = await fs.readFile(path.join(url), "utf-8");
  const stringsArr = data.split("\n");
  return stringsArr;
}

interface IDictionary {
  [key: string]: number;
}

// dictionary
function createDictionary(arr: string[]): IDictionary {
  const dictionary: IDictionary = {};
  arr.map((item) => {
    if (item in dictionary) {
      dictionary[item]++;
    } else {
      dictionary[item] = 1;
    }
  });
  return dictionary;
}

// Uniq in all files
async function uniqueValues(url: string): Promise<void> {
  // start of calculation timer
  const starTimer = Date.now();

  const fileNames = await readFileNames(url);
  if (!fileNames) return;

  const promiseArr: Array<Promise<string[]>> = [];
  fileNames.forEach((file) => {
    promiseArr.push(readFileContentToArr(path.join(url, file)));
  });
  await Promise.all(promiseArr)
    .then((item) => item.map((item) => createDictionary(item)))
    .then((result) => {
      const countUniqPhrases = result
        .map((item) => Object.keys(item).length)
        .reduce((prev, next) => prev + next);
      console.log(`Unique phrases in all files: ${countUniqPhrases}`);
      // end of calculation timer
      const endTimer = Date.now();
      console.log(
        `Unique phrases in all files counted for ${
          (endTimer - starTimer) / 1000
        } seconds.`
      );
    });
}

uniqueValues(dirPath);

// Count all exist phrases in all files
async function existInAllFiles(url: string): Promise<void> {
  // start of calculation timer
  const starTimer = Date.now();

  const fileNames = await readFileNames(url);
  if (!fileNames) return;

  const promiseArr: Array<Promise<string[]>> = [];
  fileNames.forEach((file) => {
    promiseArr.push(readFileContentToArr(path.join(url, file)));
  });
  await Promise.all(promiseArr).then((result) => {
    const countAllPhrases = result
      .map((item) => Object.keys(item).length)
      .reduce((prev, next) => prev + next);
    console.log(`All phrases in all files: ${countAllPhrases}`);
    // end of calculation timer
    const endTimer = Date.now();
    console.log(
      `All phrases in all files counted for ${
        (endTimer - starTimer) / 1000
      } seconds.`
    );
  });
}

existInAllFiles(dirPath);

// Count phrases at least at ten files
async function existInAtLeastTen(url: string) {
  // start of calculation timer
  const starTimer = Date.now();

  const fileNames = await readFileNames(url);
  if (!fileNames) return;

  const promiseArr: Array<Promise<string[]>> = [];
  fileNames.forEach((file) => {
    promiseArr.push(readFileContentToArr(path.join(url, file)));
  });
  await Promise.all(promiseArr)
    .then((items) => items.map((item) => createDictionary(item)))
    .then((arrOfDictionaries) =>
      arrOfDictionaries.map((item) => Object.keys(item))
    )
    .then((arrOfStringsArrays) => {
      const unwrappedArr: string[] = [];
      arrOfStringsArrays.map((item) => unwrappedArr.push(...item));
      return unwrappedArr;
    })
    .then((unwrappedArr) => createDictionary(unwrappedArr))
    .then((dictionary) => {
      const countAtLeastInTenFiles = Object.values(dictionary).filter(
        (element) => element >= 10
      ).length;

      console.log(`Phrases at least in 10 files: ${countAtLeastInTenFiles}`);
      // end of calculation timer
      const endTimer = Date.now();
      console.log(
        `Phrases at least in 10 files counted for ${
          (endTimer - starTimer) / 1000
        } seconds.`
      );
    });
}

existInAtLeastTen(dirPath);