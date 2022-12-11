"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const allclinics_1 = __importDefault(require("./routes/info/allclinics"));
const byclinicslug_1 = __importDefault(require("./routes/info/byclinicslug"));
const bystateandsuburb_1 = __importDefault(require("./routes/info/bystateandsuburb"));
const bycityname_1 = __importDefault(require("./routes/search/bycityname"));
const byclinicaddress_1 = __importDefault(require("./routes/search/byclinicaddress"));
const bypostcode_1 = __importDefault(require("./routes/search/bypostcode"));
const bysuburbname_1 = __importDefault(require("./routes/search/bysuburbname"));
const nearbypostcode_1 = __importDefault(require("./routes/near/nearbypostcode"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/", allclinics_1.default);
app.use("/", byclinicslug_1.default);
app.use("/", bystateandsuburb_1.default);
app.use("/", bycityname_1.default);
app.use("/", byclinicaddress_1.default);
app.use("/", bypostcode_1.default);
app.use("/", bysuburbname_1.default);
app.use("/", nearbypostcode_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});
