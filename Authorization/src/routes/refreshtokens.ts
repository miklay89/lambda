import Router from "express";
import refreshTokensController from "../controllers/refreshtokens";

const router = Router();

router.post("/refresh", refreshTokensController);

export default router;