import Product from "../sequelize/models/product.model.js";

export const createProduct = async (req, res) => {
  const { name, price, description, category } = req.body;

  // Check for required fields
  if (!name || (!price && price !== 0) || !category) {
    return res.status(400).json({
      error: "Name, price, and category are required fields.",
    });
  }

  // Validate data types
  if (typeof name !== "string" || typeof category !== "string") {
    return res.status(400).json({
      error: "Name and category must be strings.",
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      error: "Price must be a number greater than zero.",
    });
  }

  try {
    // Create and save the product in the database
    const product = await Product.create({
      name,
      price,
      description,
      category,
    });

    return res.status(201).json({
      message: "Product created successfully.",
      product,
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
