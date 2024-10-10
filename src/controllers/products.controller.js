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
    // Find the product by its primary key (ID)
    const product = await Product.findByPk(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({
        error: "Product not found.",
      });
    }

    // Return the product if found
    return res.status(200).json({
      product,
    });
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
