"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressions_1 = require("drizzle-orm/expressions");
const drizzle_orm_pg_1 = require("drizzle-orm-pg");
const db_1 = __importDefault(require("../../libs/db"));
const { clinicsTable, suburbsTable } = db_1.default.Tables;
const nearBySuburb = async (req, res) => {
    try {
        const suburbName = req.params.suburb_name.toLocaleLowerCase();
        const nearOne = (0, drizzle_orm_pg_1.alias)(clinicsTable, "near_one");
        const nearTwo = (0, drizzle_orm_pg_1.alias)(clinicsTable, "near_two");
        const nearThree = (0, drizzle_orm_pg_1.alias)(clinicsTable, "near_three");
        const nearFour = (0, drizzle_orm_pg_1.alias)(clinicsTable, "near_four");
        const db = await db_1.default.Connector.connect();
        const query = await db
            .select(clinicsTable)
            .where((0, expressions_1.ilike)(clinicsTable.suburb_name, suburbName));
        if (!query.length) {
            return res.json({ message: "Not found." });
        }
        return res.json(query);
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            return res.json({ error_message: err.message });
        }
    }
    return null;
};
exports.default = nearBySuburb;
