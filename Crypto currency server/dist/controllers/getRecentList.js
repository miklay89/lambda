"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const getRecentList = async (req, res) => {
    const data = await (0, database_1.getListRecent)();
    res.json({
        message: "Last average price for all cryptocurrency",
        prices: data,
    });
};
exports.default = getRecentList;
