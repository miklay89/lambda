"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressions_1 = require("drizzle-orm/expressions");
const db_1 = __importDefault(require("../../libs/db"));
const schema_1 = require("../../data/schema");
const { clinicsTable } = db_1.default.Tables;
const getClinicByStateAndSuburb = async (req, res) => {
    try {
        const suburbSlug = `${req.params.state_name.toLocaleLowerCase()}/${req.params.suburb_name.toLocaleLowerCase()}`;
        const db = await db_1.default.Connector.connect();
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
            .innerJoin(schema_1.suburbsTable, (0, expressions_1.eq)(schema_1.suburbsTable.suburb_slug, clinicsTable.link_to_clinic_suburb_page))
            .where((0, expressions_1.eq)(schema_1.suburbsTable.suburb_slug, suburbSlug));
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
exports.default = getClinicByStateAndSuburb;
