"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressions_1 = require("drizzle-orm/expressions");
const drizzle_orm_pg_1 = require("drizzle-orm-pg");
const db_1 = __importDefault(require("../../libs/db"));
const { clinicsTable, suburbsTable } = db_1.default.Tables;
const nearByPostcode = async (req, res) => {
    try {
        const { postcode } = req.params;
        const db = await db_1.default.Connector.connect();
        const nearOne = (0, drizzle_orm_pg_1.alias)(clinicsTable, "near_one");
        const nearTwo = (0, drizzle_orm_pg_1.alias)(clinicsTable, "near_two");
        const nearThree = (0, drizzle_orm_pg_1.alias)(clinicsTable, "near_three");
        const nearFour = (0, drizzle_orm_pg_1.alias)(clinicsTable, "near_four");
        const query = await db
            .select(clinicsTable)
            .fields({
            long_name_version: clinicsTable.long_name_version,
            pms: clinicsTable.pms,
            meta_title: clinicsTable.meta_title,
            meta_description: clinicsTable.meta_description,
            clinic_slug: clinicsTable.clinic_slug,
            website: clinicsTable.website,
            clinic_name: clinicsTable.clinic_name,
            display_on_web: clinicsTable.display_on_web,
            link_to_clinic_suburb_page: clinicsTable.link_to_clinic_suburb_page,
            full_address: clinicsTable.full_address,
            city_name: clinicsTable.city_name,
            suburb_name: clinicsTable.suburb_name,
            state: clinicsTable.state,
            postcode: clinicsTable.postcode,
            email: clinicsTable.email,
            phone: clinicsTable.phone,
        })
            .leftJoin(suburbsTable, (0, expressions_1.eq)(clinicsTable.link_to_clinic_suburb_page, suburbsTable.suburb_slug))
            .leftJoin(nearOne, (0, expressions_1.eq)(nearOne.link_to_clinic_suburb_page, clinicsTable.nearby1_link))
            .leftJoin(nearTwo, (0, expressions_1.eq)(nearTwo.link_to_clinic_suburb_page, clinicsTable.nearby2_link))
            .leftJoin(nearThree, (0, expressions_1.eq)(nearThree.link_to_clinic_suburb_page, clinicsTable.nearby3_link))
            .leftJoin(nearFour, (0, expressions_1.eq)(nearFour.link_to_clinic_suburb_page, clinicsTable.nearby4_link))
            .where((0, expressions_1.eq)(suburbsTable.postcode, postcode));
        if (!query.length) {
            return res.json({ message: "Not found." });
        }
        const data = query.map((e) => e.clinics);
        return res.json(data);
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            return res.json({ error_message: err.message });
        }
    }
    return null;
};
exports.default = nearByPostcode;
