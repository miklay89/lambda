import dotenv from "dotenv";
import { PgConnector } from "drizzle-orm-pg";
import { Pool } from "pg";
import { citiesTable, suburbsTable, clinicsTable } from "../data/schema";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST as string,
  port: +(process.env.DB_PORT as string),
  database: process.env.DB_DATABASE_NAME as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  ssl: true,
});
const connector = new PgConnector(pool);

export default {
  Tables: {
    citiesTable,
    suburbsTable,
    clinicsTable,
  },
  Connector: connector,
};
