import dotenv from "dotenv";
import express from "express";
import loginRoutes from "./routes/login";
import mockRoutes from "./routes/mock";
import refreshTokensRoutes from "./routes/refreshtokens";
import signUpRoutes from "./routes/signup";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", loginRoutes);
app.use("/", mockRoutes);
app.use("/", refreshTokensRoutes);
app.use("/", signUpRoutes);

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
