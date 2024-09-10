const ProductCategory = require("../../frotend/src/helper/productcatagory");
const ProductModel = require("../models/ProductModel");

const singleCategoryProduct = async (req, res) => {
  try {
    // Get distinct categories from the product model
    const proudctCategory = await ProductModel.distinct("category");

    // Array to store one product from each category
    const productByCategory = [];

    // Iterate over the distinct categories
    for (const category of proudctCategory) {
      const product = await ProductModel.findOne({ category });
      if (product) {
        productByCategory.push(product);
      }
    }

    // Send the response with the collected products
    res.json({
      message: "Category Product",
      data: productByCategory,
      success: true,
      error: false
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

module.exports = singleCategoryProduct;
