import { RequestHandler } from "express";
import { eq } from "drizzle-orm/expressions";
import { alias } from "drizzle-orm-pg";
import dbObject from "../../libs/db";

const { clinicsTable, suburbsTable } = dbObject.Tables;

const nearByPostcode: RequestHandler = async (req, res) => {
  try {
    const { postcode } = req.params;
    const db = await dbObject.Connector.connect();
    const nearOne = alias(clinicsTable, "near_one");
    const nearTwo = alias(clinicsTable, "near_two");
    const nearThree = alias(clinicsTable, "near_three");
    const nearFour = alias(clinicsTable, "near_four");
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
      .leftJoin(
        suburbsTable,
        eq(clinicsTable.link_to_clinic_suburb_page, suburbsTable.suburb_slug),
      )
      .leftJoin(
        nearOne,
        eq(nearOne.link_to_clinic_suburb_page, clinicsTable.nearby1_link),
      )
      .leftJoin(
        nearTwo,
        eq(nearTwo.link_to_clinic_suburb_page, clinicsTable.nearby2_link),
      )
      .leftJoin(
        nearThree,
        eq(nearThree.link_to_clinic_suburb_page, clinicsTable.nearby3_link),
      )
      .leftJoin(
        nearFour,
        eq(nearFour.link_to_clinic_suburb_page, clinicsTable.nearby4_link),
      )
      .where(eq(suburbsTable.postcode, postcode));
    if (!query.length) {
      return res.json({ message: "Not found." });
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

export default nearByPostcode;

/* 
3220 - 2 clinics

*vic/geelong-3220
+n1 vic/south-geelong-3220
-n2 vic/east-geelong-3219
-n3 vic/geelong-west-3218
-n4 vic/drumcondra-3215

*vic/south-geelong-3220
-n1 vic/bareena-3220
-n2 vic/newtown-3220
+n3 vic/geelong-3220
-n4 vic/east-geelong-3219
*/
