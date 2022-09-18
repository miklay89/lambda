import Router from "express";
import shortedLinkResponser from "../controllers/shortedlinkresponser";

const router = Router();

router.get("/:id", shortedLinkResponser);

export default router;
