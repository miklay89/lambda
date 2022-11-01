"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = require("../controllers/productsController");
const router = (0, express_1.default)();
router.get("/products", productsController_1.allProducts);
router.get("/products/:id", productsController_1.singleProduct);
exports.default = router;
