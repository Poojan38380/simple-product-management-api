import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  try {
    res.status(201).send({
      name: name,
      price: price,
      description: description,
      category: category,
    });
  } catch (error) {
    console.error("Error in createProduct controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error in getAllProducts controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
  } catch (error) {
    console.error("Error in getSingleProduct controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
  } catch (error) {
    console.error("Error in updateProduct controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
  } catch (error) {
    console.error("Error in deleteProduct controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
