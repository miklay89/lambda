import Router from "express";
import { allOrders, singleOrder } from "../controllers/ordersController";

const router = Router();

router.get("/orders", allOrders);
router.get("/orders/:id", singleOrder);

export default router;
