import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";
import { finished } from "stream/promises";
import dbObject from "./libs/db";

const citiesCsvUrl = path.resolve(
  __dirname,
  "..",
  "raw_data_for_db",
  "cities.csv",
);
const clinicsCsvUrl = path.resolve(
  __dirname,
  "..",
  "raw_data_for_db",
  "clinics.csv",
);
const suburbsCsvUrl = path.resolve(
  __dirname,
  "..",
  "raw_data_for_db",
  "suburbs.csv",
);

interface ICities {
  city_slug: string;
  city_name: string;
  state: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  h2: string;
  sub_heading_text: string;
  tick_1: string;
  tick_2: string;
  tick_3: string;
  about_bookphysio: string;
}
interface IClinics {
  long_name_version: string;
  typeform_registration_link: string;
  pms: string;
  meta_title: string;
  meta_description: string;
  clinic_slug: string;
  website: string;
  clinic_name: string;
  display_on_web: string;
  link_to_clinic_suburb_page: string;
  full_address: string;
  city_name: string;
  suburb_name: string;
  state: string;
  postcode: string;
  email: string;
  phone: string;
  nearby1_txt: string;
  nearby1_link: string;
  nearby2_txt: string;
  nearby2_link: string;
  nearby3_txt: string;
  nearby3_link: string;
  nearby4_txt: string;
  nearby4_link: string;
  about_clinic: string;
}
interface ISuburbs {
  rec_num?: string; // need to delete
  suburb_slug: string;
  suburb_name: string;
  city_slug: string; // need to add manually - hardcode!)
  city_name: string;
  state: string;
  postcode: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  h2: string;
  about_bookphysio: string;
  nearby1_link: string;
  nearby1_txt: string;
  nearby1_state: string;
  nearby1_postcode: string;
  nearby2_link: string;
  nearby2_txt: string;
  nearby2_state: string;
  nearby2_postcode: string;
  nearby3_link: string;
  nearby3_txt: string;
  nearby3_state: string;
  nearby3_postcode: string;
  nearby4_link: string;
  nearby4_txt: string;
  nearby4_state: string;
  nearby4_postcode: string;
}

async function parseFromFileToArr<T>(url: string): Promise<T[]> {
  const resultArr: any[] = [];
  const parser = fs
    .createReadStream(url)
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => resultArr.push(row))
    .on("end", () => console.log(`File by url: ${url} parsed correct.`));
  await finished(parser);
  return resultArr as T[];
}

// before parsing I changed headers in csv files!
async function start() {
  try {
    const citiesFromCsv = await parseFromFileToArr<ICities>(citiesCsvUrl);
    const clinicsFromCsv = await parseFromFileToArr<IClinics>(clinicsCsvUrl);
    const suburbsFromCsv = await parseFromFileToArr<ISuburbs>(suburbsCsvUrl);

    // suburbs data: deleting field rec_num and adding field city_slug
    // eslint-disable-next-line array-callback-return
    suburbsFromCsv.map((el) => {
      // eslint-disable-next-line no-param-reassign
      delete el.rec_num;
      // eslint-disable-next-line no-param-reassign
      el.city_slug = `/${el.city_name.toLocaleLowerCase().replace(" ", "-")}`;
    });
    // filtering data by city for creating a relations in DB
    // city_hash = 100 cities
    const cityHash = citiesFromCsv.map((el) => el.city_slug);
    // filter suburbs by city_hash = 1029 suburbs
    const filteredSuburbsByCity = suburbsFromCsv.filter((el) =>
      cityHash.includes(el.city_slug),
    );
    // creating suburb hash for filtering clinics
    const suburbsHash = filteredSuburbsByCity.map((el) => el.suburb_slug);
    // filter clinics by suburbHash = 916 clinics
    const filteredClinicsBySuburb = clinicsFromCsv.filter((el) =>
      suburbsHash.includes(el.link_to_clinic_suburb_page),
    );
    const insertObject = {
      citiesData: citiesFromCsv,
      suburbsData: filteredSuburbsByCity,
      clinicsData: filteredClinicsBySuburb,
    };

    // connect to DB
    const db = await dbObject.Connector.connect();
    // erasing tables
    await db.delete(dbObject.Tables.citiesTable);
    await db.delete(dbObject.Tables.suburbsTable);
    await db.delete(dbObject.Tables.clinicsTable);
    // inserting in DB
    await db
      .insert(dbObject.Tables.citiesTable)
      .values(...insertObject.citiesData);
    await db
      .insert(dbObject.Tables.suburbsTable)
      .values(...insertObject.suburbsData);
    await db
      .insert(dbObject.Tables.clinicsTable)
      .values(...insertObject.clinicsData);
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
}

start();
