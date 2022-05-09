"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlError = exports.getData = exports.checkDataAndSave = void 0;
const storage_1 = require("../models/storage");
const validators_1 = require("../validators/validators");
const checkDataAndSave = async (req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    // incorrect type of data (none-JSON format)
    if (typeof json !== 'object') {
        res.end("Incorrect type of data, please input data in JSON format");
    }
    // validation of data
    if (typeof json === 'object' &&
        Object.keys(json).length !== 0 &&
        (0, validators_1.validationEntries)(json)) {
        const isSaved = await saveToDB(id, json);
        if (isSaved) {
            res.end('Data was saved');
        }
        else {
            res.end('This url is busy try another one');
        }
    }
    else {
        res.end("No data included, please input some data in JSON format");
    }
};
exports.checkDataAndSave = checkDataAndSave;
const getData = async (req, res, next) => {
    const id = req.params.id;
    const isSaved = await storage_1.jsonDataStorage.findOne({ id: id });
    if (!isSaved) {
        res.end("No data founded, please input correct url");
    }
    else {
        res.status(200).json(isSaved === null || isSaved === void 0 ? void 0 : isSaved.data);
    }
};
exports.getData = getData;
const urlError = (req, res, next) => {
    res.end("Incorrect url, please type the correct url first");
};
exports.urlError = urlError;
async function saveToDB(id, json) {
    try {
        const isSaved = await storage_1.jsonDataStorage.findOne({ id: id });
        if (isSaved) {
            return false;
        }
        else {
            const data = new storage_1.jsonDataStorage({ id: id, data: json });
            await data.save();
            return true;
        }
    }
    catch (e) {
        console.log(e);
    }
}
