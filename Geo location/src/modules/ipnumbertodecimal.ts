export default function calcIPNumber(ipAdress: string): number {
  const ipNumber = ipAdress.split('.');
  const string = 16777216 * parseInt(ipNumber[0]) + 65536 * parseInt(ipNumber[1]) + 256 * parseInt(ipNumber[2]) + parseInt(ipNumber[3]);
  return string;
}

