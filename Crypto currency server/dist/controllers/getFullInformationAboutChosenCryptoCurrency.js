"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const getFullInformationAboutChosenCryptoCurrency = async (req, res) => {
    const cryptoSymbol = req.query.cryptoSymbol;
    const market = req.query.market;
    const period = req.query.period;
    const userId = req.query.userId;
    const switchFollowingState = req.query.switchFollowingState;
    const isFollowing = await (0, database_1.checkIsFollowingFromDB)(userId, cryptoSymbol);
    if (switchFollowingState === "true") {
        await (0, database_1.updateFollowingState)(userId, cryptoSymbol, isFollowing);
        res.json({ message: "following state was changed" });
        return;
    }
    if (period) {
        const data = await (0, database_1.getAveragePriceByTimeInterval)(cryptoSymbol, market, +period);
        if (!data) {
            res.json("No data founded in DB");
            return;
        }
        const responseMessage = {
            cryptoSymbol,
            market,
            average_price: data[0][`AVG(a.${market})`],
            period: `${period} ms`,
            isFollowing,
        };
        res.json(responseMessage);
        return;
    }
    const data = await (0, database_1.getLastPrice)(cryptoSymbol, market);
    if (!data) {
        res.json("No data founded in DB");
        return;
    }
    const responseMessage = {
        cryptoSymbol,
        market,
        last_price: data[0][`${market}`],
        period: "not set",
        isFollowing,
    };
    res.json(responseMessage);
};
exports.default = getFullInformationAboutChosenCryptoCurrency;
