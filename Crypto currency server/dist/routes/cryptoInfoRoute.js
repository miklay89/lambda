"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getFullInformationAboutChosenCryptoCurrency_1 = __importDefault(require("../controllers/getFullInformationAboutChosenCryptoCurrency"));
const getRecentList_1 = __importDefault(require("../controllers/getRecentList"));
const addToFavouriteList_1 = __importDefault(require("../controllers/addToFavouriteList"));
const deleteFromFavouriteList_1 = __importDefault(require("../controllers/deleteFromFavouriteList"));
const getFavouriteList_1 = __importDefault(require("../controllers/getFavouriteList"));
const router = (0, express_1.default)();
router.post("/", getFullInformationAboutChosenCryptoCurrency_1.default);
router.post("/listRecent", getRecentList_1.default);
router.post("/addToFavourite", addToFavouriteList_1.default);
router.post("/deleteFavourite", deleteFromFavouriteList_1.default);
router.post("/getFavouriteList", getFavouriteList_1.default);
exports.default = router;
