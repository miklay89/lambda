import Router from "express";
import checkPower from "../controllers/checkpower";

const router = Router();

// simple echo
router.get("/check", checkPower);

export default router;
