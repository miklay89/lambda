import Router from "express";
import { allProducts, singleProduct } from "../controllers/productsController";

const router = Router();

router.get("/products", allProducts);
router.get("/products/:id", singleProduct);

export default router;
