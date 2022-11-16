"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const refreshtokens_1 = __importDefault(require("../controllers/refreshtokens"));
const router = (0, express_1.default)();
router.post("/refresh", refreshtokens_1.default);
exports.default = router;
