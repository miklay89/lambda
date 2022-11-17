import Router from "express";
import getDataController from "../controllers/getfromstorage";

const router = Router();

// getting json from storage by id
router.get("/:id", getDataController);

export default router;
