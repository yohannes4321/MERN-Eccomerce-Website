const ProductModel =require("../models/ProductModel")
const getcategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    console.log('Category received:', category);  // Log the received category

    if (!category) {
      return res.status(400).json({
        message: "Category is required",
        error: true,
        success: false
      });
    }

    const product = await ProductModel.find({ category }).lean();
    console.log('Products found:', product);  // Log the found products

    res.status(200).json({
      message: "Category Product",
      data: product,
      success: true,
      error: false
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};
module.exports=getcategoryWiseProduct