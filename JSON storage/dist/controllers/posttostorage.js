"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const storagemodel_1 = __importDefault(require("../models/storagemodel"));
const datavalidator_1 = __importDefault(require("../validators/datavalidator"));
const postData = async (req, res) => {
    const id = req.params.id;
    if (!id || id.length == 0)
        return res.json({
            message: "Incorrect url, please type the correct url first",
        });
    const json = req.body;
    // validate data! in the end object (not empty) or arr not empty
    const validData = (0, datavalidator_1.default)(json);
    if (!validData)
        return res.json({
            message: "Incorrect type of data, please input data in JSON format.",
        });
    // check url exist in DB
    await db_1.default.connect();
    const isSavedPreviously = await storagemodel_1.default.findOne({ id: id });
    if (isSavedPreviously)
        return res.json({ message: "This url was used before try another one." });
    // save data in DB
    await db_1.default.save(id, json);
    db_1.default.closeConnection();
    return res.json({ message: "Data was saved.", data: json });
};
exports.default = postData;
