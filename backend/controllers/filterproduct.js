const productModel = require("../models/ProductModel");

const filterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category || [];

    let filterCondition = {};
    if (categoryList.length > 0) {
      filterCondition = {
        category: {
          "$in": categoryList,
        },
      };
    }

    const product = await productModel.find(filterCondition);

    res.json({
      data: product,
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
