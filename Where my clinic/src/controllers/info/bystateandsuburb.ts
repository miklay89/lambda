import { RequestHandler } from "express";
import { eq } from "drizzle-orm/expressions";
import dbObject from "../../libs/db";
import { suburbsTable } from "../../data/schema";

const { clinicsTable } = dbObject.Tables;

// clinic by state_name and suburb_name
const getClinicByStateAndSuburb: RequestHandler = async (req, res) => {
  try {
    const suburbSlug = `${req.params.state_name.toLocaleLowerCase()}/${req.params.suburb_name.toLocaleLowerCase()}`;
    const db = await dbObject.Connector.connect();
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
      .innerJoin(
        suburbsTable,
        eq(suburbsTable.suburb_slug, clinicsTable.link_to_clinic_suburb_page),
      )
      .where(eq(suburbsTable.suburb_slug, suburbSlug));
    if (!query.length) {
      return res.status(404).json({ message: "Not found." });
    }
    const data = query.map((e) => e.clinics);
    return res.json(data);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return res.json({ error_message: err.message });
    }
  }
  return null;
};

export default getClinicByStateAndSuburb;
