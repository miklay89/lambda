import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import linkhorterRoute from "./routes/linkshorter";
import shortLinkResponserRoute from "./routes/shortedlinkresponser";

dotenv.config();

const PORT = (process.env.PORT as string) || 5000;
const databaseURI = process.env.MONGO_DB_URI as string;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/", linkhorterRoute);
app.use("/", shortLinkResponserRoute);

// conection to DB
mongoose.connect(databaseURI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Connected to DB successfully");
});

app.listen(process.env.PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
