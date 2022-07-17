import Router from "express";

import getFullInformationAboutChosenCryptoCurrency from "../controllers/getFullInformationAboutChosenCryptoCurrency";
import getRecentList from "../controllers/getRecentList";
import addToFavouriteList from "../controllers/addToFavouriteList";
import deleteFromFavourite from "../controllers/deleteFromFavouriteList";
import getFavouriteList from "../controllers/getFavouriteList";

const router = Router();
// getting price of cryptocurrency by period or without period average price by market
router.post("/", getFullInformationAboutChosenCryptoCurrency);

// get recent list
router.post("/listRecent", getRecentList);

// add to favourite list - string 255 chars
router.post("/addToFavourite", addToFavouriteList);

// remove from favourite list
router.post("/deleteFavourite", deleteFromFavourite);

// get listFavourite
router.post("/getFavouriteList", getFavouriteList);

export default router;
