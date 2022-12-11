"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bycityname_1 = __importDefault(require("../../controllers/search/bycityname"));
const router = (0, express_1.default)();
router.get("/search/city/:city_name", bycityname_1.default);
exports.default = router;
