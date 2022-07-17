"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const addToFavouriteList = async (req, res) => {
    const userId = req.query.userId;
    const cryptoSymbol = req.query.cryptoSymbol;
    const isFavourite = await (0, database_1.checkInFavouriteList)(userId, cryptoSymbol);
    if (!isFavourite) {
        await (0, database_1.saveToFavouriteList)(userId, cryptoSymbol);
        res.json({
            message: `Cryptocurrency ${cryptoSymbol} saved to favourite list`,
        });
        return;
    }
    res.json({
        message: `Cryptocurrency ${cryptoSymbol} already stored in DB.`,
    });
};
exports.default = addToFavouriteList;
