import { RequestHandler } from "express";
import { eq } from "drizzle-orm/expressions";
import dbObject from "../../libs/db";

const { clinicsTable } = dbObject.Tables;

// searching clinics by postcode
const searchByPostcode: RequestHandler = async (req, res) => {
  try {
    const { postcode } = req.params;
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
      .where(eq(clinicsTable.postcode, postcode));
    if (!query.length) {
      return res.json({ message: "Not found." });
    }
    return res.json(query);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return res.json({ error_message: err.message });
    }
  }
  return null;
};

export default searchByPostcode;
