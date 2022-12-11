"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const byclinicslug_1 = __importDefault(require("../../controllers/info/byclinicslug"));
const router = (0, express_1.default)();
router.get("/info/clinic/:clinic_slug", byclinicslug_1.default);
exports.default = router;
