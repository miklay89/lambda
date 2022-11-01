import { RequestHandler } from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const dataBaseUrl = process.env.DATABASE_URL as string;

// select all orders
export const allOrders: RequestHandler = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dataBaseUrl);
    const queryString = `SELECT
      O.OrderID,
      SUM(OD.UnitPrice * OD.Quantity) AS TotalProductsPrice, 
      SUM(OD.Quantity) AS TotalProductsItems, 
      COUNT(OD.OrderId) AS TotalProductsQuantity, 
      O.ShippedDate, 
      O.ShipName, 
      O.ShipCity, 
      O.ShipCountry
      FROM OrderDetails OD, Orders O
      WHERE OD.OrderId = O.OrderID
      GROUP BY O.OrderID`;
    const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
    const startQueryTime = Date.now();
    const orders = await connection.query(queryString);
    const endQueryTime = Date.now();
    connection.end();
    if (Array.isArray(orders[0]) && orders[0].length > 0) {
      return res.json({
        queryInfo: {
          queryString,
          queryTS,
          queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
        },
        data: orders[0],
      });
    }
    return res.json({
      queryInfo: {
        queryString,
        queryTS,
        queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
      },
      data: "No such orders information.",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error,
    });
  }
};

// select single order by id and products in order information
export const singleOrder: RequestHandler = async (req, res) => {
  const id = +req.params.id;
  try {
    const connection = await mysql.createConnection(dataBaseUrl);

    // order information
    const queryStringOrderInformation = `SELECT
      SUM(OD.UnitPrice * OD.Discount * OD.Quantity) AS TotalProductsDiscount, 
      SUM(OD.UnitPrice * OD.Quantity) AS TotalProductsPrice, 
      SUM(OD.Quantity) AS TotalProductsItems, 
      COUNT(OD.OrderId) AS TotalProducts, 
      O.CustomerID, 
      O.OrderID, 
      O.ShippedDate, 
      O.ShipName, 
      O.ShipCity, 
      S.CompanyName, 
      O.ShipCountry, 
      O.Freight,
      O.OrderDate, 
      O.RequiredDate,
      O.ShipRegion, 
      O.ShipPostalCode
      FROM OrderDetails OD, Orders O, Shippers S
      WHERE OD.OrderId = O.OrderId AND O.ShipVia = S.ShipperID AND O.OrderId = ${id}`;
    const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
    const startQueryOrderInformationTime = Date.now();
    const orderInformation = await connection.query(
      queryStringOrderInformation,
    );
    const endQueryOrderInformation = Date.now();

    // products in order table
    const queryStringProductsInOrder = `SELECT
      OD.ProductID,
      P.ProductName,
      OD.Quantity,
      OD.UnitPrice,
      (OD.UnitPrice * OD.Quantity) AS TotalProductsPrice,
      OD.Discount
      FROM OrderDetails OD, Products P
      WHERE OD.ProductID = P.ProductID AND OD.OrderId = ${id}`;
    const startQueryProductsInOrderTime = Date.now();
    const productsInOrder = await connection.query(queryStringProductsInOrder);
    const endQueryProductsInOrderTime = Date.now();
    connection.end();
    if (
      Array.isArray(orderInformation[0]) &&
      Array.isArray(productsInOrder[0]) &&
      orderInformation[0].length > 0 &&
      productsInOrder[0].length > 0
    ) {
      return res.json({
        queryInfo: {
          queryStringOrderInformation: {
            queryString: queryStringOrderInformation,
            queryTS,
            queryExecutionTime: `${
              endQueryOrderInformation - startQueryOrderInformationTime
            }ms`,
          },
          queryStringProductsInOrder: {
            queryString: queryStringProductsInOrder,
            queryTS,
            queryExecutionTime: `${
              endQueryProductsInOrderTime - startQueryProductsInOrderTime
            }ms`,
          },
        },
        data: {
          orderInformation: orderInformation[0][0],
          productsInOrder: productsInOrder[0],
        },
      });
    }
    return res.json({
      queryInfo: {
        queryStringOrderInformation: {
          queryString: queryStringOrderInformation,
          queryTS,
          queryExecutionTime: `${
            endQueryOrderInformation - startQueryOrderInformationTime
          }ms`,
        },
        queryStringProductsInOrder: {
          queryString: queryStringProductsInOrder,
          queryTS,
          queryExecutionTime: `${
            endQueryProductsInOrderTime - startQueryProductsInOrderTime
          }ms`,
        },
      },
      data: "No such order.",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error,
    });
  }
};
