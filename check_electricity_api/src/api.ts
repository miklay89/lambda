import dotenv from "dotenv";
import express from "express";
import checkPowerRoutes from "./routes/checkpower";

dotenv.config();

// API config
const PORT = (process.env.API_PORT as string) || 5000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// echo
app.use("/", checkPowerRoutes);

app.listen(PORT, () => {
  console.log(`API-server has been started on port ${PORT}...`);
});
