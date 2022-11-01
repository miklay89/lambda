import Router from "express";
import {
  allCustomers,
  singleCustomer,
} from "../controllers/customersController";

const router = Router();

router.get("/customers", allCustomers);
router.get("/customers/:id", singleCustomer);

export default router;
