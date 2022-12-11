"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const drizzle_orm_pg_1 = require("drizzle-orm-pg");
const pg_1 = require("pg");
const schema_1 = require("../data/schema");
dotenv_1.default.config();
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: true,
});
const connector = new drizzle_orm_pg_1.PgConnector(pool);
exports.default = {
    Tables: {
        citiesTable: schema_1.citiesTable,
        suburbsTable: schema_1.suburbsTable,
        clinicsTable: schema_1.clinicsTable,
    },
    Connector: connector,
};
