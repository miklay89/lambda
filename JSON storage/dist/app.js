"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const getfromstorage_1 = __importDefault(require("./routes/getfromstorage"));
const posttostorage_1 = __importDefault(require("./routes/posttostorage"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/", getfromstorage_1.default);
app.use("/", posttostorage_1.default);
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}.`);
});
