const ProductModel = require("../models/ProductModel");

const filterProductController = async (req, res) => {
  try {
    const { category, city, area, specialLocation } = req.body;

    const filterCondition = {};
    
    if (category) {
      filterCondition.category = { "$in": category };
    }
    if (city) {
      filterCondition.city = city;
    }
    if (area) {
      filterCondition.area = area;
    }
    if (specialLocation) {
      filterCondition.specialLocation = specialLocation;
    }

    const products = await ProductModel.find(filterCondition);

    res.json({
      data: products,
      message: "Products fetched successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;
