import Router from "express";
import searchBySuburbName from "../../controllers/search/bysuburbname";

const router = Router();

router.get("/search/suburb/:suburb_name", searchBySuburbName);

export default router;
