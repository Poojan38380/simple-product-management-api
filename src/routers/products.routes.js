import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/products.controller.js";

const ProductRouter = express.Router();

ProductRouter.post("/", createProduct);
ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:productId", getSingleProduct);
ProductRouter.put("/:productId", updateProduct);
ProductRouter.delete("/:productId", deleteProduct);

export default ProductRouter;
