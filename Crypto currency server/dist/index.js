"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cronJobProgram_1 = __importDefault(require("./helpers/cronJobProgram"));
const cryptoInfoRoute_1 = __importDefault(require("./routes/cryptoInfoRoute"));
dotenv_1.default.config();
(0, cronJobProgram_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/", cryptoInfoRoute_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server has been started on port ${process.env.PORT}.`);
});
