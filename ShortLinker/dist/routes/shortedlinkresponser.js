"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shortedlinkresponser_1 = __importDefault(require("../controllers/shortedlinkresponser"));
const router = (0, express_1.default)();
router.get("/:id", shortedlinkresponser_1.default);
exports.default = router;
