"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customersController_1 = require("../controllers/customersController");
const router = (0, express_1.default)();
router.get("/customers", customersController_1.allCustomers);
router.get("/customers/:id", customersController_1.singleCustomer);
exports.default = router;
