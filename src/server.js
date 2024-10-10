import express from "express";
import dotenv from "dotenv";
import ProductRouter from "./routers/products.routes.js";
import sequelize from "./sequelize/db.js";

const PORT = process.env.PORT || 3001;

dotenv.config();
const app = express();

app.use(express.json());

app.use("/products", ProductRouter);

// Sync Sequelize models with the database
sequelize
  .sync({ alter: true }) // Use 'alter: true' to modify tables to match models
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });

// 404 error handling middleware
app.use((req, res, next) => {
  res.status(404).send(`
    <html>
      <body>
        <h1>Endpoint undefined</h1>
        <p>Please go to <a href="https://github.com/Poojan38380/simple-product-management-api">https://github.com/Poojan38380/simple-product-management-api</a> to learn about all the endpoints.</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
