"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checktoken_1 = __importDefault(require("../middlewares/checktoken"));
const mock_1 = __importDefault(require("../controllers/mock"));
const router = (0, express_1.default)();
router.post("/me/:id", checktoken_1.default, mock_1.default);
exports.default = router;
