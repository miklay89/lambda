import Router from "express";
import postDataController from "../controllers/posttostorage";

const router = Router();

// sending json to storage (to DB)
router.post("/:id", postDataController);

export default router;
