"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const csv = __importStar(require("fast-csv"));
const promises_1 = require("stream/promises");
const db_1 = __importDefault(require("./libs/db"));
const citiesCsvUrl = path.resolve(__dirname, "..", "raw_data_for_db", "cities.csv");
const clinicsCsvUrl = path.resolve(__dirname, "..", "raw_data_for_db", "clinics.csv");
const suburbsCsvUrl = path.resolve(__dirname, "..", "raw_data_for_db", "suburbs.csv");
async function parseFromFileToArr(url) {
    const resultArr = [];
    const parser = fs
        .createReadStream(url)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => console.error(error))
        .on("data", (row) => resultArr.push(row))
        .on("end", () => console.log(`File by url: ${url} parsed correct.`));
    await (0, promises_1.finished)(parser);
    return resultArr;
}
async function start() {
    try {
        const citiesFromCsv = await parseFromFileToArr(citiesCsvUrl);
        const clinicsFromCsv = await parseFromFileToArr(clinicsCsvUrl);
        const suburbsFromCsv = await parseFromFileToArr(suburbsCsvUrl);
        suburbsFromCsv.map((el) => {
            delete el.rec_num;
            el.city_slug = `/${el.city_name.toLocaleLowerCase().replace(" ", "-")}`;
        });
        const cityHash = citiesFromCsv.map((el) => el.city_slug);
        const filteredSuburbsByCity = suburbsFromCsv.filter((el) => cityHash.includes(el.city_slug));
        const suburbsHash = filteredSuburbsByCity.map((el) => el.suburb_slug);
        const filteredClinicsBySuburb = clinicsFromCsv.filter((el) => suburbsHash.includes(el.link_to_clinic_suburb_page));
        const insertObject = {
            citiesData: citiesFromCsv,
            suburbsData: filteredSuburbsByCity,
            clinicsData: filteredClinicsBySuburb,
        };
        const db = await db_1.default.Connector.connect();
        await db.delete(db_1.default.Tables.citiesTable);
        await db.delete(db_1.default.Tables.suburbsTable);
        await db.delete(db_1.default.Tables.clinicsTable);
        await db
            .insert(db_1.default.Tables.citiesTable)
            .values(...insertObject.citiesData);
        await db
            .insert(db_1.default.Tables.suburbsTable)
            .values(...insertObject.suburbsData);
        await db
            .insert(db_1.default.Tables.clinicsTable)
            .values(...insertObject.clinicsData);
    }
    catch (err) {
        if (err instanceof Error)
            console.log(err.message);
    }
}
start();
