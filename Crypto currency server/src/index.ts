// шифт + контрод + i = получаем работу притиера
import dotenv from "dotenv";
import express from "express";
import runCron from "./helpers/cronJobProgram";
import telegramRoutes from "./routes/cryptoInfoRoute";

dotenv.config();
runCron();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", telegramRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server has been started on port ${process.env.PORT}.`);
});
