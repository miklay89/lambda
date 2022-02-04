const https = require('https');
const {readFile} = require('fs');
const util = require('util');
const readFilePromise = util.promisify(readFile);

// array with urls
async function getUrls(path) {
  const data = await readFilePromise(path, 'utf8');
  return data.split('\r\n');
}

// sending req
async function sendRequests() {
  try {
    let result = [];
    const urls = await getUrls('./url.txt');
    for(let i = 0; i < urls.length; i++) {
    // timer start
    // const start_time = process.hrtime();
    const data = await reqModule(urls[i], 0);
    if(data.data === 'invalid request') continue;
    const key = await getKey(data);
    result.push(key);
    console.log(`${key.url}: isDone - ${key.value}`);
    
    // timer
    // const end_time = process.hrtime(start_time);
    // console.log(`Ответ получен за ${end_time[0] + (end_time[1]/1000000000)} сек.`);
    }

    // console.log(result);
    const resTrue = result.filter(item => item.value === true);
    const resFalse = result.filter(item => item.value === false);
    console.log("Значений true:", resTrue.length);
    console.log("Значений false:", resFalse.length);

  } catch (e) {
    console.log(e);
  }
}

async function reqModule(url, i) {
  return new Promise((resolve, reject) => {
    if(i === 3) {
      console.log(`Invalid request to ${url}`);
      resolve({'url': url, data: 'invalid request'});
    } else {
      https.get(url, (res) => {
        let data = "";
      
      // 3 times reconection
      if(res.statusCode !=200) {
        i++;
        resolve(reqModule(url, i));
      }
      
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if(res.statusCode == 200) {
          data = JSON.parse(data);
        resolve({'url': url, data: data});
        }
        
      });
    
    }).on('error', (e) => {
      reject(e);
    });
    }
  });
}

async function getKey(obj) {
  const url = obj.url;
  const data = obj.data;

  function findValueRecursive(obj) {
    for (let prop in obj) {
      if(obj.hasOwnProperty('isDone')) {
        return obj.isDone;
      } else {
        if(obj[prop].hasOwnProperty('isDone')) {
          return findValueRecursive(obj[prop]);
        }
      }
    }
  }

  const value = findValueRecursive(data);

  return {url: url, value: value};
}

sendRequests();