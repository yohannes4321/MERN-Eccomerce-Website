const AddtoCart = require("../models/CartProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Prevent decreasing the quantity below 1
    if (quantity < 1) {
      return res.json({
        message: "Quantity cannot be less than 1",
        success: false,
        error: true,
      });
    }

    // Update the quantity of the cart product by its ID
    const updatecart = await AddtoCart.findByIdAndUpdate(
      productId, // This assumes productId is the _id of the cart item
      { $set: { quantity } }, // Update the quantity
      { new: true } // Return the updated document
    );

    if (updatecart) {
      res.json({
        data: updatecart,
        message: "Cart Updated successfully",
        success: true,
        error: false,
      });
    } else {
      res.json({
        message: "Product not found in cart",
        success: false,
        error: true,
      });
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = updateAddToCartProduct;
