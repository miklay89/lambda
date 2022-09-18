"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../libs/db"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const linkshorter = async (req, res) => {
    const { link } = req.body;
    if (!link) {
        res.json({
            message: "link in body is required",
        });
        return;
    }
    const shortLink = `localhost:${PORT}/${shortid_1.default.generate()}`;
    const longLink = link;
    const isSaved = await db_1.default.findOne({ longLink }).catch((err) => {
        console.log("Error while searching in DB - ", err);
    });
    if (isSaved) {
        res.json({ shortLink: isSaved.shortLink });
        return;
    }
    const data = new db_1.default({ shortLink, longLink });
    await data.save().catch((err) => {
        console.log("Error while saving to DB - ", err);
    });
    res.json({
        shortLink,
    });
};
exports.default = linkshorter;
