"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleCustomer = exports.allCustomers = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dataBaseUrl = process.env.DATABASE_URL;
const allCustomers = async (req, res) => {
    try {
        const connection = await promise_1.default.createConnection(dataBaseUrl);
        const queryString = `SELECT CustomerID, CompanyName, ContactName, ContactTitle, City, Country FROM Customers`;
        const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
        const startQueryTime = Date.now();
        const customers = await connection.query(queryString);
        const endQueryTime = Date.now();
        connection.end();
        if (Array.isArray(customers[0]) && customers[0].length > 0) {
            return res.json({
                queryInfo: {
                    queryString,
                    queryTS,
                    queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
                },
                data: customers[0],
            });
        }
        return res.json({
            queryInfo: {
                queryString,
                queryTS,
                queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
            },
            data: "No such customers.",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            error,
        });
    }
};
exports.allCustomers = allCustomers;
const singleCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await promise_1.default.createConnection(dataBaseUrl);
        const queryString = `SELECT CompanyName, ContactName, ContactTitle, Address, City, PostalCode, Region, Country, Phone, Fax FROM Customers WHERE CustomerID = "${id}"`;
        const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
        const startQueryTime = Date.now();
        const customers = await connection.query(queryString);
        const endQueryTime = Date.now();
        connection.end();
        if (Array.isArray(customers[0]) && customers[0].length > 0) {
            return res.json({
                queryInfo: {
                    queryString,
                    queryTS,
                    queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
                },
                data: customers[0][0],
            });
        }
        return res.json({
            queryInfo: {
                queryString,
                queryTS,
                queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
            },
            data: "No such customer.",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            error,
        });
    }
};
exports.singleCustomer = singleCustomer;
