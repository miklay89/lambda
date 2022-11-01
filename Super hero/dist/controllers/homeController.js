"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homeController = async (req, res) => {
    return res.json({
        message: "You are in home controller",
    });
};
exports.default = homeController;
