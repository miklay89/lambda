"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeesController_1 = require("../controllers/employeesController");
const router = (0, express_1.default)();
router.get("/employees", employeesController_1.allEmployees);
router.get("/employees/:id", employeesController_1.singleEmployee);
exports.default = router;
