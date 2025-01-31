const express = require("express");
const {ProductModel} = require("../models/Product.js");
const {verifyToken} = require("../middleware/authMiddleware.js");

const productRoutes = express.Router();

// Get all products (public access)
productRoutes.get("/", async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
});

// Create a product (authenticated users only)
productRoutes.post("/", verifyToken, async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const product = new ProductModel({ name, price, description, user: req.userId });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product
productRoutes.put("/:id", verifyToken, async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product || product.user.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
productRoutes.delete("/:id", verifyToken, async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product || product.user.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await product.remove();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=  productRoutes;
