"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinicsTable = exports.suburbsTable = exports.citiesTable = void 0;
const drizzle_orm_pg_1 = require("drizzle-orm-pg");
exports.citiesTable = (0, drizzle_orm_pg_1.pgTable)("cities", {
    city_slug: (0, drizzle_orm_pg_1.text)("city_slug").notNull().primaryKey(),
    city_name: (0, drizzle_orm_pg_1.text)("city_name").notNull(),
    state: (0, drizzle_orm_pg_1.text)("state").notNull(),
    meta_title: (0, drizzle_orm_pg_1.text)("meta_title"),
    meta_description: (0, drizzle_orm_pg_1.text)("meta_description"),
    h1: (0, drizzle_orm_pg_1.text)("h1"),
    h2: (0, drizzle_orm_pg_1.text)("h2"),
    sub_heading_text: (0, drizzle_orm_pg_1.text)("sub_heading_text"),
    tick_1: (0, drizzle_orm_pg_1.text)("tick_1"),
    tick_2: (0, drizzle_orm_pg_1.text)("tick_2"),
    tick_3: (0, drizzle_orm_pg_1.text)("tick_3"),
    about_bookphysio: (0, drizzle_orm_pg_1.text)("about_bookphysio"),
}, (table) => ({
    uniqueIdx: (0, drizzle_orm_pg_1.index)("unique_idx", [table.city_name, table.state], {
        unique: true,
    }),
}));
exports.suburbsTable = (0, drizzle_orm_pg_1.pgTable)("suburbs", {
    suburb_slug: (0, drizzle_orm_pg_1.text)("suburb_slug").notNull().primaryKey(),
    suburb_name: (0, drizzle_orm_pg_1.text)("suburb_name"),
    city_slug: (0, drizzle_orm_pg_1.text)("city_slug")
        .notNull()
        .references(() => exports.citiesTable.city_slug),
    city_name: (0, drizzle_orm_pg_1.text)("city_name").notNull(),
    state: (0, drizzle_orm_pg_1.text)("state").notNull(),
    postcode: (0, drizzle_orm_pg_1.text)("postcode"),
    meta_title: (0, drizzle_orm_pg_1.text)("meta_title"),
    meta_description: (0, drizzle_orm_pg_1.text)("meta_description"),
    h1: (0, drizzle_orm_pg_1.text)("h1"),
    h2: (0, drizzle_orm_pg_1.text)("h2"),
    about_bookphysio: (0, drizzle_orm_pg_1.text)("about_bookphysio"),
    nearby1_link: (0, drizzle_orm_pg_1.text)("nearby1_link"),
    nearby1_txt: (0, drizzle_orm_pg_1.text)("nearby1_txt"),
    nearby1_state: (0, drizzle_orm_pg_1.text)("nearby1_state"),
    nearby1_postcode: (0, drizzle_orm_pg_1.text)("nearby1_postcode"),
    nearby2_link: (0, drizzle_orm_pg_1.text)("nearby2_link"),
    nearby2_txt: (0, drizzle_orm_pg_1.text)("nearby2_txt"),
    nearby2_state: (0, drizzle_orm_pg_1.text)("nearby2_state"),
    nearby2_postcode: (0, drizzle_orm_pg_1.text)("nearby2_postcode"),
    nearby3_link: (0, drizzle_orm_pg_1.text)("nearby3_link"),
    nearby3_txt: (0, drizzle_orm_pg_1.text)("nearby3_txt"),
    nearby3_state: (0, drizzle_orm_pg_1.text)("nearby3_state"),
    nearby3_postcode: (0, drizzle_orm_pg_1.text)("nearby3_postcode"),
    nearby4_link: (0, drizzle_orm_pg_1.text)("nearby4_link"),
    nearby4_txt: (0, drizzle_orm_pg_1.text)("nearby4_txt"),
    nearby4_state: (0, drizzle_orm_pg_1.text)("nearby4_state"),
    nearby4_postcode: (0, drizzle_orm_pg_1.text)("nearby4_postcode"),
});
exports.clinicsTable = (0, drizzle_orm_pg_1.pgTable)("clinics", {
    long_name_version: (0, drizzle_orm_pg_1.text)("long_name_version"),
    typeform_registration_link: (0, drizzle_orm_pg_1.text)("typeform_registration_link"),
    pms: (0, drizzle_orm_pg_1.text)("pms"),
    meta_title: (0, drizzle_orm_pg_1.text)("meta_title"),
    meta_description: (0, drizzle_orm_pg_1.text)("meta_description"),
    clinic_slug: (0, drizzle_orm_pg_1.text)("clinic_slug").notNull().primaryKey(),
    website: (0, drizzle_orm_pg_1.text)("website"),
    clinic_name: (0, drizzle_orm_pg_1.text)("clinic_name").notNull(),
    display_on_web: (0, drizzle_orm_pg_1.text)("display_on_web"),
    link_to_clinic_suburb_page: (0, drizzle_orm_pg_1.text)("link_to_clinic_suburb_page")
        .notNull()
        .references(() => exports.suburbsTable.suburb_slug),
    full_address: (0, drizzle_orm_pg_1.text)("full_address"),
    city_name: (0, drizzle_orm_pg_1.text)("city_name").notNull(),
    suburb_name: (0, drizzle_orm_pg_1.text)("suburb_name").notNull(),
    state: (0, drizzle_orm_pg_1.text)("state").notNull(),
    postcode: (0, drizzle_orm_pg_1.text)("postcode"),
    email: (0, drizzle_orm_pg_1.text)("email"),
    phone: (0, drizzle_orm_pg_1.text)("phone"),
    nearby1_txt: (0, drizzle_orm_pg_1.text)("nearby1_txt"),
    nearby1_link: (0, drizzle_orm_pg_1.text)("nearby1_link"),
    nearby2_txt: (0, drizzle_orm_pg_1.text)("nearby2_txt"),
    nearby2_link: (0, drizzle_orm_pg_1.text)("nearby2_link"),
    nearby3_txt: (0, drizzle_orm_pg_1.text)("nearby3_txt"),
    nearby3_link: (0, drizzle_orm_pg_1.text)("nearby3_link"),
    nearby4_txt: (0, drizzle_orm_pg_1.text)("nearby4_txt"),
    nearby4_link: (0, drizzle_orm_pg_1.text)("nearby4_link"),
    about_clinic: (0, drizzle_orm_pg_1.text)("about_clinic"),
});
