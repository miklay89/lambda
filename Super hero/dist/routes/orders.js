"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersController_1 = require("../controllers/ordersController");
const router = (0, express_1.default)();
router.get("/orders", ordersController_1.allOrders);
router.get("/orders/:id", ordersController_1.singleOrder);
exports.default = router;
