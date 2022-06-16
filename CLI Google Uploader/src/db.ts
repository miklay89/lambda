import fs from 'fs';
import util from 'util';
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

export async function readToken(path: string) {
  if (fs.existsSync(path)) {
    const content = await readFilePromise(path, 'utf-8');
    const data = JSON.parse(content);
    // console.log(data);
    return data
  } else {
    return false;
  }
}

export async function saveToken(path: string, data: object) {
  const content = JSON.stringify(data);
  writeFilePromise(path, content);
}

