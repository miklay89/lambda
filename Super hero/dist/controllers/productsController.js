"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleProduct = exports.allProducts = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dataBaseUrl = process.env.DATABASE_URL;
const allProducts = async (req, res) => {
    try {
        const connection = await promise_1.default.createConnection(dataBaseUrl);
        const queryString = `SELECT ProductID, ProductName, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder FROM Products`;
        const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
        const startQueryTime = Date.now();
        const products = await connection.query(queryString);
        const endQueryTime = Date.now();
        connection.end();
        if (Array.isArray(products[0]) && products[0].length > 0) {
            return res.json({
                queryInfo: {
                    queryString,
                    queryTS,
                    queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
                },
                data: products[0],
            });
        }
        return res.json({
            queryInfo: {
                queryString,
                queryTS,
                queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
            },
            data: "No such information about products.",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            error,
        });
    }
};
exports.allProducts = allProducts;
const singleProduct = async (req, res) => {
    const id = +req.params.id;
    try {
        const connection = await promise_1.default.createConnection(dataBaseUrl);
        const queryString = `SELECT
      P.ProductName,
      S.SupplierID,
      S.CompanyName,
      P.QuantityPerUnit,
      P.UnitPrice,
      P.UnitsInStock,
      P.UnitsOnOrder,
      P.ReorderLevel,
      P.Discontinued
      FROM Products P, Supplies S
      WHERE P.SupplierID = S.SupplierID AND P.ProductID = ${id}`;
        const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
        const startQueryTime = Date.now();
        const product = await connection.query(queryString);
        const endQueryTime = Date.now();
        connection.end();
        if (Array.isArray(product[0]) && product[0].length > 0) {
            return res.json({
                queryInfo: {
                    queryString,
                    queryTS,
                    queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
                },
                data: product[0][0],
            });
        }
        return res.json({
            queryInfo: {
                queryString,
                queryTS,
                queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
            },
            data: "No such product.",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            error,
        });
    }
};
exports.singleProduct = singleProduct;
