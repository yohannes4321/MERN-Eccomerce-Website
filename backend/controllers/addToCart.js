const cartProducts = require("../models/CartProduct");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    // Check if the product is already in the user's cart
    const isProductAvailable = await cartProducts.findOne({ productId, userId: currentUser });
    
    if (isProductAvailable) {
      return res.json({
        message: "Product has already been added to the cart.",
        success: false,
        error: true,
        data: isProductAvailable,
      });
    }

    // Prepare payload for new cart item
    const payload = {
      productId: productId,
      quantity: 1, // Default quantity is 1
      userId: currentUser,
    };

    // Create and save new cart item
    const newAddToCart = new cartProducts(payload);
    const saveProduct = await newAddToCart.save();

    res.json({
      message: "Product added to cart successfully.",
      success: true,
      error: false,
      data: saveProduct,
    });
  } catch (err) {
    res.json({
      message: err?.message || "An error occurred while adding the product to the cart.",
      success: false,
      error: true,
    });
  }
};

module.exports = addToCart;
