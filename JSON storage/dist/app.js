"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("./keys/keys"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const db_1 = __importDefault(require("./db"));
const storage_1 = __importDefault(require("./routes/storage"));
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, body_parser_1.json)());
app.use('/storage', storage_1.default);
app.listen(keys_1.default.PORT, () => {
    console.log(`Server has been started on port ${keys_1.default.PORT}.`);
});
