"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const allclinics_1 = __importDefault(require("../../controllers/info/allclinics"));
const router = (0, express_1.default)();
router.get("/info/clinics", allclinics_1.default);
exports.default = router;
