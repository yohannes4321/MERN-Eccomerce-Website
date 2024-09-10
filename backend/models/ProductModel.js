const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
  productName: String,
  brandName: String,
  category: String,
  productImage: [],
  description: String,
  price: { type: Number, required: true },
  selling: { type: Number, required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Farmer
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual field to calculate the discount percentage
ProductSchema.virtual('discountPercentage').get(function () {
  if (this.price && this.selling) {
    return Math.round(((this.price - this.selling) / this.price) * 100);
  }
  return 0;
});

// Virtual field to calculate savings
ProductSchema.virtual('savings').get(function () {
  if (this.price && this.selling) {
    return this.price - this.selling;
  }
  return 0;
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
