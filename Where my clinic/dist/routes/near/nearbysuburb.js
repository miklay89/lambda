"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nearbysuburb_1 = __importDefault(require("../../controllers/near/nearbysuburb"));
const router = (0, express_1.default)();
router.get("/near/suburb/:suburb_name", nearbysuburb_1.default);
exports.default = router;
