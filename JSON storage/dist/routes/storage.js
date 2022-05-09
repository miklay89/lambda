"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../controllers/storage");
const storage_2 = require("../controllers/storage");
const storage_3 = require("../controllers/storage");
const router = (0, express_1.Router)();
// sending json to storage (to DB)
router.post('/:id', storage_1.checkDataAndSave);
// empty url (empty)
router.post('/', storage_3.urlError).get('/', storage_3.urlError);
// getting json from storage by id
// need to check if it exists in DB
router.get('/:id', storage_2.getData);
exports.default = router;
