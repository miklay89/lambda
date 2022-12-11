import dotenv from "dotenv";
import express from "express";

// TODO check all names and test all endpoints

import allClinicsRoutes from "./routes/info/allclinics";
import oneClinicByClinicSlugRoutes from "./routes/info/byclinicslug";
import getClinicByStateAndSuburbRoutes from "./routes/info/bystateandsuburb";
import searchByCityNameRoutes from "./routes/search/bycityname";
import searchByClinicAddressRoutes from "./routes/search/byclinicaddress";
import searchByPostcodeRoutes from "./routes/search/bypostcode";
import searchBySuburbNameRoutes from "./routes/search/bysuburbname";
import nearByPostcodeRoutes from "./routes/near/nearbypostcode";

dotenv.config();

const PORT = (process.env.PORT as string) || 5000;
// const databaseURI = process.env.MONGO_DB_URI as string;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// info
app.use("/", allClinicsRoutes);
app.use("/", oneClinicByClinicSlugRoutes);
app.use("/", getClinicByStateAndSuburbRoutes);

// search
app.use("/", searchByCityNameRoutes);
app.use("/", searchByClinicAddressRoutes);
app.use("/", searchByPostcodeRoutes);
app.use("/", searchBySuburbNameRoutes);

// nearby
app.use("/", nearByPostcodeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
