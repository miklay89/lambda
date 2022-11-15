"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
function findByIP(decimalIpNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const instream = fs_1.default.createReadStream(path_1.default.join(__dirname, "..", "..", "ip base", "IP2LOCATION-LITE-DB1.CSV"));
            const outstream = process.stdout;
            const rl = readline_1.default.createInterface({
                input: instream,
                output: outstream,
                terminal: false,
            });
            rl.on("line", (line) => __awaiter(this, void 0, void 0, function* () {
                const candidate = line.split(",");
                const rangeFrom = +candidate[0].slice(1, candidate[0].length - 1);
                const rangeTo = +candidate[1].slice(1, candidate[1].length - 1);
                if (decimalIpNumber >= rangeFrom && decimalIpNumber <= rangeTo) {
                    resolve(candidate[3].slice(1, candidate[3].length - 1));
                    rl.close();
                }
            }));
            rl.on("close", () => {
                resolve(null);
            });
        });
    });
}
exports.default = findByIP;
