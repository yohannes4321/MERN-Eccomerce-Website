const ProductModel = require("../models/ProductModel");
const searchProduct = async (req, res) => {
  try {
    const { q, area } = req.query;
    const regex = q ? new RegExp(q, 'i') : null;

    const searchConditions = {
      ...(regex && { $or: [{ productName: regex }, { category: regex }] }),
      ...(area && { area }),
    };

    const products = await ProductModel.find(searchConditions);

    res.json({
      data: products,
      message: 'Products fetched successfully',
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
