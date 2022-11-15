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
const logic_1 = require("./logic");
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { language, mimetype, count } = req.body;
    if (typeof language !== "string" ||
        typeof mimetype !== "string" ||
        typeof count !== "number") {
        return res.json({
            message: "Input incorrect language, mimetype and count is required",
        });
    }
    const price = (0, logic_1.calcPrice)(language, mimetype, count);
    const timeForWorkInMS = (0, logic_1.calcTime)(language, mimetype, count);
    if (typeof price === "string") {
        return res.json({ message: price });
    }
    if (typeof timeForWorkInMS === "string") {
        return res.json({ message: price });
    }
    const dateNow = Date.now();
    const deadline = (0, logic_1.calcDeadline)(timeForWorkInMS, dateNow);
    const calculation = {
        price: price,
        time: (timeForWorkInMS / 1000 / 60 / 60),
        deadlineTimeStamp: deadline.deadlineTimestamp,
        deadline_date: deadline.deadlineDate,
    };
    res.json({ calculation });
}));
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});
