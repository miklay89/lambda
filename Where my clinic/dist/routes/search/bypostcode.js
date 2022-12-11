"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bypostcode_1 = __importDefault(require("../../controllers/search/bypostcode"));
const router = (0, express_1.default)();
router.get("/search/postcode/:postcode", bypostcode_1.default);
exports.default = router;
