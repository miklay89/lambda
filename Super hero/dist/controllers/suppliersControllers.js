"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleSupplier = exports.allSuppliers = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dataBaseUrl = process.env.DATABASE_URL;
const allSuppliers = async (req, res) => {
    try {
        const connection = await promise_1.default.createConnection(dataBaseUrl);
        const queryString = `SELECT SupplierID, CompanyName, ContactName, ContactTitle, City, Country FROM Supplies`;
        const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
        const startQueryTime = Date.now();
        const suppliers = await connection.query(queryString);
        const endQueryTime = Date.now();
        connection.end();
        if (Array.isArray(suppliers[0]) && suppliers[0].length > 0) {
            return res.json({
                queryInfo: {
                    queryString,
                    queryTS,
                    queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
                },
                data: suppliers[0],
            });
        }
        return res.json({
            queryInfo: {
                queryString,
                queryTS,
                queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
            },
            data: "No such information about suppliers.",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            error,
        });
    }
};
exports.allSuppliers = allSuppliers;
const singleSupplier = async (req, res) => {
    const id = +req.params.id;
    try {
        const connection = await promise_1.default.createConnection(dataBaseUrl);
        const queryString = `SELECT
      CompanyName,
      ContactName,
      ContactTitle,
      Address,
      City,
      Region,
      PostalCode,
      Country,
      Phone
      FROM Supplies
      WHERE SupplierID = ${id}`;
        const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
        const startQueryTime = Date.now();
        const supplier = await connection.query(queryString);
        const endQueryTime = Date.now();
        connection.end();
        if (Array.isArray(supplier[0]) && supplier[0].length > 0) {
            return res.json({
                queryInfo: {
                    queryString,
                    queryTS,
                    queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
                },
                data: supplier[0][0],
            });
        }
        return res.json({
            queryInfo: {
                queryString,
                queryTS,
                queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
            },
            data: "No such supplier.",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            error,
        });
    }
};
exports.singleSupplier = singleSupplier;
