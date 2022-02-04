const path = require('path');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
// const dirPath = path.join(__dirname, '200k_words_100x100');
const dirPath = path.join(__dirname, '2kk_words_400x400');
const start_time = process.hrtime();

// считываем названия файлов
function readFileNames(dirPath) {
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(dirPath, (err, files) => {
        if(err) console.log(err);
        // console.log(files);
        resolve(files);
      });
    } catch (err) {
      reject(err);
    }
  });
}

// считаем строки (словарь)
function uniq(a) {
  let seen = {};
  return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

// Уникальных словосочетаний во всех файлах
async function uniqueValues(dirPath) {
  const fileNames = await readFileNames(dirPath);
  let result = 0;
  let fileCount = 0;
  fileNames.forEach(file => {
    const instream = fs.createReadStream(path.join(dirPath, file));
    const outstream = new stream();
    const rl = readline.createInterface(instream, outstream);
    let arr = [];

    rl.on('line', function(line) {
      let nameLine = line;
      arr.push(nameLine);
    });

    rl.on('close', function() {
      arr = uniq(arr);
      fileCount++;
      result += arr.length;
      if (fileCount === fileNames.length) {
        let end_time = process.hrtime(start_time);
        console.log(`Уникальных словосочетаний во всех файлах посчитано за ${end_time[0] + (end_time[1]/1000000000)} сек.`);
        console.log(`Уникальных словосочетаний во всех файлах: ${result}`);
      }
    });
  });
}

uniqueValues(dirPath);

// Всего словосочетаний, которые есть во всех 20 файлах
async function existInAllFiles(dirPath) {
  const fileNames = await readFileNames(dirPath);
  let result = 0;
  let fileCount = 0;
  fileNames.forEach(file => {
    const instream = fs.createReadStream(path.join(dirPath, file));
    const outstream = new stream();
    const rl = readline.createInterface(instream, outstream);
    let arr = [];

    rl.on('line', function(line) {
      let nameLine = line;
      arr.push(nameLine);
    });

    rl.on('close', function() {
      fileCount++;
      result += arr.length;
      if (fileCount === fileNames.length) {
        let end_time = process.hrtime(start_time);
        console.log(`Всего словосочетаний, которые есть во всех 20 файлах посчитано за ${end_time[0] + (end_time[1]/1000000000)} сек.`);
        console.log(`Всего словосочетаний, которые есть во всех 20 файлах: ${result}`);
      }
    });
  });
}

existInAllFiles(dirPath);

// Словосочетаний, которые есть, как минимум, в десяти файлах
async function existInAtLeastTen() {
  const fileNames = await readFileNames(dirPath);
  let result = 0;
  let resArr = [];
  let fileCount = 0;
  fileNames.forEach(file => {
    const instream = fs.createReadStream(path.join(dirPath, file));
    const outstream = new stream();
    const rl = readline.createInterface(instream, outstream);
    let arr = [];

    rl.on('line', function(line) {
      let nameLine = line;
      arr.push(nameLine);
    });

    rl.on('close', function() {
      resArr = [...resArr, ...uniq(arr)];
      fileCount++;

      if (fileCount === fileNames.length) {
        let count = {};
        let value = 0;

        resArr.forEach(item => {
          if (count[item]) {
            count[item] += 1;
            return;
          }
          count[item] = 1;
        });

        for (let prop in count) {
          if (count[prop] >= 10) {
            value += 1;
          }
        }
        
        let end_time = process.hrtime(start_time);
        console.log(`Словосочетаний, которые есть, как минимум, в десяти файлах посчитано за ${end_time[0] + (end_time[1]/1000000000)} сек.`);
        console.log(`Словосочетаний, которые есть, как минимум, в десяти файлах: ${value}`);
      }
    });
  });
}

existInAtLeastTen(dirPath);