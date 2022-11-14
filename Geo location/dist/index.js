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
const express_1 = __importDefault(require("express"));
const ipnumbertodecimal_1 = __importDefault(require("./modules/ipnumbertodecimal"));
const findbyip_1 = __importDefault(require("./modules/findbyip"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.ip)
        return res.json({ message: "IP-address is required." });
    const ipAddress = req.body.ip;
    const ipToDecimal = (0, ipnumbertodecimal_1.default)(ipAddress);
    const location = yield (0, findbyip_1.default)(ipToDecimal);
    res.json({
        message: `Okey, you are  from - ${location.slice(1, location.length - 1)}`,
        ip_address: ipAddress,
    });
}));
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});
