"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../libs/db"));
dotenv_1.default.config();
const db = db_1.default.Connector;
const { customersTable } = db_1.default.Tables;
const allCustomers = async (req, res) => {
    try {
        const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
        const startQueryTime = Date.now();
        const query = await db.select(customersTable);
        const endQueryTime = Date.now();
        const queryExecutionTime = `${endQueryTime - startQueryTime}ms`;
        if (!query.length) {
            return res.status(404).json({ message: "Not found." });
        }
        const response = {
            data: query,
            queryInfo: {
                queryString: db.select(customersTable).toSQL().sql,
                queryTS,
                queryExecutionTime,
            },
        };
        res.json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return res.status(400).json({
                error_msg: error.message,
            });
        }
    }
    return null;
};
exports.default = allCustomers;
