"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleEmployee = exports.allEmployees = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dataBaseUrl = process.env.DATABASE_URL;
const allEmployees = async (req, res) => {
    try {
        const connection = await promise_1.default.createConnection(dataBaseUrl);
        const queryString = `SELECT EmployeeID, CONCAT (FirstName, ' ', LastName) AS EmployeeName, Title, City, HomePhone, Country FROM Employees`;
        const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
        const startQueryTime = Date.now();
        const employees = await connection.query(queryString);
        const endQueryTime = Date.now();
        connection.end();
        if (Array.isArray(employees[0]) && employees[0].length > 0) {
            return res.json({
                queryInfo: {
                    queryString,
                    queryTS,
                    queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
                },
                data: employees[0],
            });
        }
        return res.json({
            queryInfo: {
                queryString,
                queryTS,
                queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
            },
            data: "No such employees.",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            error,
        });
    }
};
exports.allEmployees = allEmployees;
const singleEmployee = async (req, res) => {
    const id = +req.params.id;
    try {
        const connection = await promise_1.default.createConnection(dataBaseUrl);
        const queryString = `SELECT E.EmployeeID,
      CONCAT (E.FirstName, ' ', E.LastName) AS EmployeeName,
      E.Title,
      E.TitleOfCourtesy,
      E.BirthDate,
      E.HireDate,
      E.Address,
      E.Address AS Address,
      E.City,
      E.PostalCode,
      E.Country,
      E.HomePhone,
      E.Extension,
      E.Notes,
      E.ReportsTo,
      R.EmployeeID AS ReportEmployeeID,
      CONCAT (R.FirstName, ' ', R.LastName) AS ReportEmployeeName,
      R.Title AS ReportTitle,
      R.TitleOfCourtesy AS ReportTitleOfCourtesy,
      R.BirthDate AS ReportBirthDate,
      R.HireDate AS ReportHireDate,
      R.City AS ReportCity,
      R.PostalCode AS ReportPostalCode,
      R.Country AS ReportCountry,
      R.HomePhone AS ReportHomePhone,
      R.Extension AS ReportExtension,
      R.Notes AS ReportNotes,
      R.ReportsTo AS ReportReportsTo
      FROM Employees E
      LEFT OUTER JOIN Employees R ON E.ReportsTo = R.EmployeeID WHERE E.EmployeeID = ${id}`;
        const queryTS = new Date().toISOString().slice(0, 19).replace("T", " ");
        const startQueryTime = Date.now();
        const employee = await connection.query(queryString);
        connection.end();
        const endQueryTime = Date.now();
        if (Array.isArray(employee[0]) && employee[0].length > 0) {
            return res.json({
                queryInfo: {
                    queryString,
                    queryTS,
                    queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
                },
                data: employee[0][0],
            });
        }
        return res.json({
            queryInfo: {
                queryString,
                queryTS,
                queryExecutionTime: `${endQueryTime - startQueryTime}ms`,
            },
            data: "No such employee.",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            error,
        });
    }
};
exports.singleEmployee = singleEmployee;
