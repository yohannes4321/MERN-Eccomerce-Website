const ProductModel = require("../models/ProductModel");

const searchProduct = async (req, res) => {
  try {
    const { q, city, area, specialLocation } = req.query; // Receive search query and location
    const regex = new RegExp(q, "i"); // Create a case-insensitive search for the query
    
    const searchConditions = {
      "$or": [
        { productName: regex },
        { category: regex },
        { city: city || "" },               // Add city to the search conditions
        { area: area || "" },               // Add area to the search conditions
        { specialLocation: specialLocation || "" }
      ]
    };

    const products = await ProductModel.find(searchConditions);

    res.json({
      data: products,
      message: "Products fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = searchProduct;
