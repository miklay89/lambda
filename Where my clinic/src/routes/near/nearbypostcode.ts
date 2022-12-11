import Router from "express";
import nearByPostcode from "../../controllers/near/nearbypostcode";

const router = Router();

router.get("/near/postcode/:postcode", nearByPostcode);

export default router;
