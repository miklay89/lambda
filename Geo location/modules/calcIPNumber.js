function calcIPNumber(ipAdress) {
  let string = '';
  const ipNumber = ipAdress.split('.');
  string = 16777216 * parseInt(ipNumber[0]) + 65536 * parseInt(ipNumber[1]) + 256 * parseInt(ipNumber[2]) + parseInt(ipNumber[3]);
  // console.log(string);
  
  return string;
}

module.exports = calcIPNumber;

