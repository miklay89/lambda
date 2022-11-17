"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posttostorage_1 = __importDefault(require("../controllers/posttostorage"));
const router = (0, express_1.default)();
// sending json to storage (to DB)
router.post("/:id", posttostorage_1.default);
exports.default = router;
