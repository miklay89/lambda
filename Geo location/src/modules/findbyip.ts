import fs from "fs";
import path from "path";
import readline from "readline";

export default async function findByIP(
  decimalIpNumber: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const instream = fs.createReadStream(
      path.join(__dirname, "..", "..", "ip base", "IP2LOCATION-LITE-DB1.CSV")
    );
    const outstream = process.stdout;
    const rl = readline.createInterface({
      input: instream,
      output: outstream,
      terminal: false,
    });

    rl.on("line", async (line) => {
      const candidate = line.split(",");
      const rangeFrom = +candidate[0].slice(1, candidate[0].length - 1);
      const rangeTo = +candidate[1].slice(1, candidate[1].length - 1);

      if (decimalIpNumber >= rangeFrom && decimalIpNumber <= rangeTo) {
        resolve(candidate[3]);
        rl.close();
      }
    });

    rl.on("close", () => {
      reject("You not from our planet!)");
    });
  });
}
