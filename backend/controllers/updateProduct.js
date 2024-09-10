const ProductModel=require("../models/ProductModel")
const updateProductController = async (req, res) => {
    try {
      const { _id, price, selling, ...reqBody } = req.body;
  
      // Optionally validate that price and selling are numbers
      if (price && isNaN(price)) throw new Error("Invalid price value");
      if (selling && isNaN(selling)) throw new Error("Invalid selling value");
  
      const product = await ProductModel.findByIdAndUpdate(_id, {
        ...reqBody,
        price: parseFloat(price),
        selling: parseFloat(selling),
      });
  
      res.json({
        message: "Product is Updated Successfully",
        success: true,
        error: false,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  };
  
  module.exports = updateProductController;
  