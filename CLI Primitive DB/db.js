const { appendFile } = require('fs');
const path = require('path');
const util = require('util');
const appendFilePromise = util.promisify(appendFile);
const shift = '\r\n';

async function saveToDB(obj) {
  const data = JSON.stringify(obj);
  await appendFilePromise(path.join('./', 'DB', 'db.txt'), data + shift, 'utf-8');
}

function findInDB(data, query) {
  return data.find(item => item.name == query);
}

function readDB() {
  return new Promise((resolve, reject) => {
    const result = [];
    const lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(path.join('./', 'DB', 'db.txt'))
    });
  
    lineReader.on('line', (line) => {
      const candidate = JSON.parse(line);
      result.push(candidate);
    });
    lineReader.on('close', () => {
      resolve(result);
    });
  });
}

module.exports = {
  saveToDB,
  readDB,
  findInDB
}