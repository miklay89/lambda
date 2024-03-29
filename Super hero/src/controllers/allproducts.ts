import { RequestHandler } from "express";
import dotenv from "dotenv";
import orm from "../libs/db";

dotenv.config();

const db = orm.Connector;
const { productsTable } = orm.Tables;

// select all products
const allProducts: RequestHandler = async (req, res) => {
  try {
    // timestamp for query
    const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
    // timer start
    const startQueryTime = Date.now();
    const query = await db.select(productsTable);
    // timer end
    const endQueryTime = Date.now();
    // execution time
    const queryExecutionTime = `${endQueryTime - startQueryTime}ms`;
    if (!query.length) {
      return res.status(404).json({ message: "Not found." });
    }
    // response object
    const response = {
      data: query,
      queryInfo: {
        queryString: db.select(productsTable).toSQL().sql,
        queryTS,
        queryExecutionTime,
      },
    };
    res.json(response);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(400).json({
        error_msg: error.message,
      });
    }
  }
  return null;
};

export default allProducts;
