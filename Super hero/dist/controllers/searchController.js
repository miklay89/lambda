"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dataBaseUrl = process.env.DATABASE_URL;
const searchController = async (req, res) => {
    try {
        const tableName = req.body.table;
        const searchString = req.body.search;
        let queryString;
        if (tableName === "products") {
            queryString = `SELECT * FROM Products WHERE ProductName LIKE '%${searchString}%'`;
        }
        else {
            queryString = `SELECT * FROM Customers WHERE CompanyName LIKE '%${searchString}%' OR ContactName LIKE '%${searchString}%' OR ContactTitle LIKE '%${searchString}%' OR Address LIKE '%${searchString}%'`;
        }
        const connection = await promise_1.default.createConnection(dataBaseUrl);
        const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
        const startQueryTime = Date.now();
        const searchResult = await connection.query(queryString);
        const endQueryTime = Date.now();
        connection.end();
        if (Array.isArray(searchResult[0]) && searchResult[0].length > 0) {
            return res.json({
                queryInfo: {
                    queryString,
                    queryTS,
                    queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
                },
                data: searchResult[0],
            });
        }
        return res.json({
            queryInfo: {
                queryString,
                queryTS,
                queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
            },
            data: "No such in search results.",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            error,
        });
    }
};
exports.default = searchController;
