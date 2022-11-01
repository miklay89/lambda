import dotenv from "dotenv";
import express from "express";
import customersRoutes from "./routes/customers";
import dashboardRoutes from "./routes/dashboard";
import employeesRoutes from "./routes/employees";
import homeRoutes from "./routes/home";
import ordersRoutes from "./routes/orders";
import productsRoutes from "./routes/products";
import searchRoutes from "./routes/search";
import suppliersRoutes from "./routes/suppliers";

dotenv.config();

const PORT = (process.env.PORT as string) || 5000;
// const databaseURI = process.env.MONGO_DB_URI as string;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/", customersRoutes);
app.use("/", dashboardRoutes);
app.use("/", employeesRoutes);
app.use("/", homeRoutes);
app.use("/", ordersRoutes);
app.use("/", productsRoutes);
app.use("/", searchRoutes);
app.use("/", suppliersRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
