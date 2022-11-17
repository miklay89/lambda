"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const storagemodel_1 = __importDefault(require("../models/storagemodel"));
const getData = async (req, res) => {
    const id = req.params.id;
    if (!id || id.length == 0)
        return res.json({
            message: "Incorrect url, please type the correct url first",
        });
    await db_1.default.connect();
    const dataFromDB = await storagemodel_1.default.findOne({ id: id });
    if (!dataFromDB)
        return res.json({
            message: "No data founded in DB, please input correct url.",
        });
    db_1.default.closeConnection();
    return res.json({ data: dataFromDB.data });
};
exports.default = getData;
