import dotenv from "dotenv";
import express from "express";
import getFromStorageRoutes from "./routes/getfromstorage";
import postToStorageRoutes from "./routes/posttostorage";

dotenv.config();
const PORT = process.env.PORT as string;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", getFromStorageRoutes);
app.use("/", postToStorageRoutes);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}.`);
});
