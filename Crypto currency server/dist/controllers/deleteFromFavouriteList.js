"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const deleteFromFavourite = async (req, res) => {
    const userId = req.query.userId;
    const cryptoSymbol = req.query.cryptoSymbol;
    const isFavourite = await (0, database_1.checkInFavouriteList)(userId, cryptoSymbol);
    if (isFavourite) {
        await (0, database_1.deleteFromFavouriteList)(userId, cryptoSymbol);
        res.json({
            message: `Cryptocurrency ${cryptoSymbol} was deleted from favourite list`,
        });
        return;
    }
    res.json({
        message: `Cryptocurrency ${cryptoSymbol} already deleted from favourite list.`,
    });
};
exports.default = deleteFromFavourite;
