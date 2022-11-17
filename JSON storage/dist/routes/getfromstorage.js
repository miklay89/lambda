"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getfromstorage_1 = __importDefault(require("../controllers/getfromstorage"));
const router = (0, express_1.default)();
// getting json from storage by id
router.get("/:id", getfromstorage_1.default);
exports.default = router;
