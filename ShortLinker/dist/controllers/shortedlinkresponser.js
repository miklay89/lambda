"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../libs/db"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const shortedLinkResponser = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.json({
            message: "id is required",
        });
        return;
    }
    const fullPath = `localhost:${PORT}/${id}`;
    const isSaved = await db_1.default.findOne({ shortLink: fullPath }).catch((err) => {
        console.log("Error while searching in DB - ", err);
    });
    if (isSaved) {
        res.redirect(isSaved.longLink);
        return;
    }
    res.json({
        message: `${id} is incorrect.`,
    });
};
exports.default = shortedLinkResponser;
