"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataValidator = (data) => {
    switch (true) {
        // data is array and it not empty
        case Array.isArray(data) && data.length > 0:
            return true;
        // data is object and it not empty
        case typeof data === "object" && !Array.isArray(data) && data !== null && Object.keys(data).length > 0:
            return true;
        default:
            return false;
    }
};
exports.default = dataValidator;
