"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationEntries = void 0;
const validationEntries = (data) => {
    let isValid = true;
    if (Array.isArray(data)) {
        for (let prop of data) {
            if (Object.keys(prop).length === 0) {
                isValid = false;
                break;
            }
        }
    }
    return isValid;
};
exports.validationEntries = validationEntries;
