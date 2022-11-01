import { RequestHandler } from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const dataBaseUrl = process.env.DATABASE_URL as string;

// select all customers
export const allCustomers: RequestHandler = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dataBaseUrl);
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
  } catch (error) {
    console.log(error);
    return res.json({
      error,
    });
  }
};

// select single customer by id
export const singleCustomer: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dataBaseUrl);
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
  } catch (error) {
    console.log(error);
    return res.json({
      error,
    });
  }
};
