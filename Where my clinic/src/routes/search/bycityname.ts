import Router from "express";
import searchByCityName from "../../controllers/search/bycityname";

const router = Router();

router.get("/search/city/:city_name", searchByCityName);

export default router;
