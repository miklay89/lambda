"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const linkshorter_1 = __importDefault(require("./routes/linkshorter"));
const shortedlinkresponser_1 = __importDefault(require("./routes/shortedlinkresponser"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const databaseURI = process.env.MONGO_DB_URI;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/", linkshorter_1.default);
app.use("/", shortedlinkresponser_1.default);
mongoose_1.default.connect(databaseURI);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Connected to DB successfully");
});
app.listen(process.env.PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});
