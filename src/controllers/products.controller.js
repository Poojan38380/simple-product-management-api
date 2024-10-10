import Product from "../sequelize/models/product.model.js";

export const createProduct = async (req, res) => {
  const { name, price, description, category } = req.body;

  if (!name || (!price && price !== 0) || !category) {
    return res.status(400).json({
      error: "Name, price, and category are required fields.",
    });
  }

  if (
    (typeof name !== "string" || typeof category !== "string",
    typeof description !== "string")
  ) {
    return res.status(400).json({
      error: "Name, category and description must be strings.",
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      error: "Price must be a number greater than zero.",
    });
  }

  try {
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
  const { page = 1, limit = 10 } = req.query; // Default values: page = 1, limit = 10

  try {
    const offset = (page - 1) * limit;
    const { count, rows: products } = await Product.findAndCountAll({
      // attributes: ["id", "name", "price", "category",], // Select specific fields if not all fields are needed
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [["updatedAt", "DESC"]], // Optional: Order by latest updated products
    });

    return res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    console.error("Error in getAllProducts controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSingleProduct = async (req, res) => {
  const { productId } = req.params;

  if (isNaN(productId)) {
    return res.status(400).json({
      error: "Invalid product ID. It must be a number.",
    });
  }

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        error: "Product not found.",
      });
    }

    return res.status(200).json({
      product,
    });
  } catch (error) {
    console.error("Error in getSingleProduct controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, price, description, category } = req.body;

  if (isNaN(productId)) {
    return res.status(400).json({
      error: "Invalid product ID. It must be a number.",
    });
  }

  if (name && typeof name !== "string") {
    return res.status(400).json({
      error: "Name must be a string.",
    });
  }

  if (category && typeof category !== "string") {
    return res.status(400).json({
      error: "Category must be a string.",
    });
  }
  if (description && typeof description !== "string") {
    return res.status(400).json({
      error: "Description must be a string.",
    });
  }

  if (price && (typeof price !== "number" || price <= 0)) {
    return res.status(400).json({
      error: "Price must be a number greater than zero.",
    });
  }

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        error: "Product not found.",
      });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error("Error in updateProduct controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  if (isNaN(productId)) {
    return res.status(400).json({
      error: "Invalid product ID. It must be a number.",
    });
  }

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        error: "Product not found.",
      });
    }

    await product.destroy();

    return res.status(200).json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleteProduct controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
