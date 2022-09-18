import Router from "express";
import linkshorter from "../controllers/linkshorter";

const router = Router();

router.post("/shortlink", linkshorter);

export default router;
