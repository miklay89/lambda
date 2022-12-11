"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bysuburbname_1 = __importDefault(require("../../controllers/search/bysuburbname"));
const router = (0, express_1.default)();
router.get("/search/suburb/:suburb_name", bysuburbname_1.default);
exports.default = router;
