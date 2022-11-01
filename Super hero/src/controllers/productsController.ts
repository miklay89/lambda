import { RequestHandler } from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const dataBaseUrl = process.env.DATABASE_URL as string;

// select all products
export const allProducts: RequestHandler = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dataBaseUrl);
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
  } catch (error) {
    console.log(error);
    return res.json({
      error,
    });
  }
};

// select single product by id
export const singleProduct: RequestHandler = async (req, res) => {
  const id = +req.params.id;
  try {
    const connection = await mysql.createConnection(dataBaseUrl);
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
  } catch (error) {
    console.log(error);
    return res.json({
      error,
    });
  }
};
