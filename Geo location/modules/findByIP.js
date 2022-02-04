const { rejects } = require('assert');
const fs = require ('fs');
const { resolve } = require('path');
const path = require ('path');
const readline = require('readline');
const stream = require('stream');

function findByIP (ipNumber) {
  return new Promise((resolve, reject) => {
    const instream = fs.createReadStream(path.join(__dirname, '../' , 'ip base', 'IP2LOCATION-LITE-DB1.CSV'));
    const outstream = new stream();
    const rl = readline.createInterface(instream, outstream);
  
    rl.on('line', async (line) => {
      const candidate = line.split(',');
      const rangeFrom = +(candidate[0].slice(1, candidate[0].length - 1));
      const rangeTo = +(candidate[1].slice(1, candidate[1].length - 1));
  
      if (ipNumber >= rangeFrom && ipNumber <= rangeTo) {
        resolve(candidate[3]);
        rl.close();
      }
    });
  
    rl.on('close', () => {
      reject("You not from our planet!)");
    });
  });
}

module.exports = findByIP;