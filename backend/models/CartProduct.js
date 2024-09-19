const mongoose = require("mongoose");

const addToCartSchema = mongoose.Schema({
  productId: {
    ref: "Product", // Reference to the Product model
    type: mongoose.Schema.Types.ObjectId, // ObjectId type for referencing
    required: true,
  },
  quantity: {
    type: Number,
    default: 1, // Default quantity
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId for referencing the User
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const cartProducts = mongoose.model("CartProduct", addToCartSchema);
module.exports = cartProducts;
