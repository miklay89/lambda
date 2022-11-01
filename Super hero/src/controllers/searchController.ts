import { RequestHandler } from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const dataBaseUrl = process.env.DATABASE_URL as string;

// search logic
const searchController: RequestHandler = async (req, res) => {
  try {
    const tableName = req.body.table;
    const searchString = req.body.search;
    let queryString;
    if (tableName === "products") {
      queryString = `SELECT * FROM Products WHERE ProductName LIKE '%${searchString}%'`;
    } else {
      queryString = `SELECT * FROM Customers WHERE CompanyName LIKE '%${searchString}%' OR ContactName LIKE '%${searchString}%' OR ContactTitle LIKE '%${searchString}%' OR Address LIKE '%${searchString}%'`;
    }
    const connection = await mysql.createConnection(dataBaseUrl);
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
  } catch (error) {
    console.log(error);
    return res.json({
      error,
    });
  }
};

export default searchController;
