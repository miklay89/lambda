"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./routes/login"));
const mock_1 = __importDefault(require("./routes/mock"));
const refreshtokens_1 = __importDefault(require("./routes/refreshtokens"));
const signup_1 = __importDefault(require("./routes/signup"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/", login_1.default);
app.use("/", mock_1.default);
app.use("/", refreshtokens_1.default);
app.use("/", signup_1.default);
app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`);
});
