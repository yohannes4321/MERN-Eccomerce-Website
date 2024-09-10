const mongoose=require("mongoose")
const addToCartSchema=mongoose.Schema({
    productId: {
        ref: "Product", // Referencing Product model
        type: mongoose.Schema.Types.ObjectId, // Correct ObjectId type
      },

 
    quantity:Number,
    userId:String
},{timestamps:true}
)
const cartProducts=mongoose.model("addToCart",addToCartSchema)
module.exports=cartProducts