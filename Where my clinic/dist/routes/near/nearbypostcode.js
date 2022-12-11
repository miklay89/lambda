"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nearbypostcode_1 = __importDefault(require("../../controllers/near/nearbypostcode"));
const router = (0, express_1.default)();
router.get("/near/postcode/:postcode", nearbypostcode_1.default);
exports.default = router;
