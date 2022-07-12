import Router from "express";

import getFullInformationAboutChosenCryptoCurrency from "../controllers/getFullInformationAboutChosenCryptoCurrency";

const router = Router();

router.get("/", getFullInformationAboutChosenCryptoCurrency);

export default router;
