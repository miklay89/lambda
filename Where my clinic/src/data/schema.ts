import { pgTable, text, index } from "drizzle-orm-pg";

export const citiesTable = pgTable(
  "cities",
  {
    city_slug: text("city_slug").notNull().primaryKey(),
    city_name: text("city_name").notNull(),
    state: text("state").notNull(),
    meta_title: text("meta_title"),
    meta_description: text("meta_description"),
    h1: text("h1"),
    h2: text("h2"),
    sub_heading_text: text("sub_heading_text"),
    tick_1: text("tick_1"),
    tick_2: text("tick_2"),
    tick_3: text("tick_3"),
    about_bookphysio: text("about_bookphysio"),
  },
  (table) => ({
    uniqueIdx: index("unique_idx", [table.city_name, table.state], {
      unique: true,
    }),
  }),
);

export const suburbsTable = pgTable("suburbs", {
  suburb_slug: text("suburb_slug").notNull().primaryKey(),
  suburb_name: text("suburb_name"),
  city_slug: text("city_slug")
    .notNull()
    .references(() => citiesTable.city_slug), // add in parser
  city_name: text("city_name").notNull(),
  state: text("state").notNull(),
  postcode: text("postcode"),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  h1: text("h1"),
  h2: text("h2"),
  about_bookphysio: text("about_bookphysio"),
  nearby1_link: text("nearby1_link"),
  nearby1_txt: text("nearby1_txt"),
  nearby1_state: text("nearby1_state"),
  nearby1_postcode: text("nearby1_postcode"),
  nearby2_link: text("nearby2_link"),
  nearby2_txt: text("nearby2_txt"),
  nearby2_state: text("nearby2_state"),
  nearby2_postcode: text("nearby2_postcode"),
  nearby3_link: text("nearby3_link"),
  nearby3_txt: text("nearby3_txt"),
  nearby3_state: text("nearby3_state"),
  nearby3_postcode: text("nearby3_postcode"),
  nearby4_link: text("nearby4_link"),
  nearby4_txt: text("nearby4_txt"),
  nearby4_state: text("nearby4_state"),
  nearby4_postcode: text("nearby4_postcode"),
});

export const clinicsTable = pgTable("clinics", {
  long_name_version: text("long_name_version"),
  typeform_registration_link: text("typeform_registration_link"),
  pms: text("pms"),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  clinic_slug: text("clinic_slug").notNull().primaryKey(),
  website: text("website"),
  clinic_name: text("clinic_name").notNull(),
  display_on_web: text("display_on_web"),
  link_to_clinic_suburb_page: text("link_to_clinic_suburb_page")
    .notNull()
    .references(() => suburbsTable.suburb_slug),
  full_address: text("full_address"),
  city_name: text("city_name").notNull(),
  suburb_name: text("suburb_name").notNull(),
  state: text("state").notNull(),
  postcode: text("postcode"),
  email: text("email"),
  phone: text("phone"),
  nearby1_txt: text("nearby1_txt"),
  nearby1_link: text("nearby1_link"),
  nearby2_txt: text("nearby2_txt"),
  nearby2_link: text("nearby2_link"),
  nearby3_txt: text("nearby3_txt"),
  nearby3_link: text("nearby3_link"),
  nearby4_txt: text("nearby4_txt"),
  nearby4_link: text("nearby4_link"),
  about_clinic: text("about_clinic"),
});
