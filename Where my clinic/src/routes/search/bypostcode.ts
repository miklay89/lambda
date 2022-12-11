import Router from "express";
import searchByPostcode from "../../controllers/search/bypostcode";

const router = Router();

router.get("/search/postcode/:postcode", searchByPostcode);

export default router;
