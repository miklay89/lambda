"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const getFavouriteList = async (req, res) => {
    const userId = req.query.userId;
    const favouriteListQuery = await (0, database_1.getFavouriteListFromDB)(userId);
    if (!favouriteListQuery) {
        res.json({
            message: "No cryptocurrency in favourite list",
        });
        return;
    }
    const data = await (0, database_1.getFavouriteListCryptoCurrency)(favouriteListQuery);
    res.json({
        message: "Favourite list cryptocurrency",
        data,
    });
};
exports.default = getFavouriteList;
