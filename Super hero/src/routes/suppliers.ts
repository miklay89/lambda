import Router from "express";
import {
  allSuppliers,
  singleSupplier,
} from "../controllers/suppliersControllers";

const router = Router();

router.get("/suppliers", allSuppliers);
router.get("/suppliers/:id", singleSupplier);

export default router;
