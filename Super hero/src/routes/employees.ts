import Router from "express";
import {
  allEmployees,
  singleEmployee,
} from "../controllers/employeesController";

const router = Router();

router.get("/employees", allEmployees);
router.get("/employees/:id", singleEmployee);

export default router;
