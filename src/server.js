import express from "express";
import dotenv from "dotenv";
import ProductRouter from "./routers/products.routes.js";

const PORT = process.env.PORT || 3001;

dotenv.config();
const app = express();

app.use(express.json());

app.use("/products", ProductRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
