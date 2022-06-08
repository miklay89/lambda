import { writeFile, readFile } from 'fs';
import path from 'path';
import util from 'util';
const writeFilePromise = util.promisify(writeFile);
const readFilePromise = util.promisify(readFile);

interface DataFroDB {
  dateInserting: Date;
  data: string;
}

export async function saveToDB(string: string) {
  try {
    await writeFilePromise(path.join(__dirname, 'db.txt'), string, 'utf8');
  } catch(err) {
    console.log(err);
  }
}

export async function readFromDb(): Promise<string | undefined> {
  try {
    const data = await readFilePromise(path.join(__dirname, 'db.txt'), 'utf-8');
    return data;
  } catch(err) {
    console.log(err);
  }
}
