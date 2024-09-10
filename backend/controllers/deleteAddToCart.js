const AddtoCart =require("../models/CartProduct")
const deleteAddToCartProduct=async(req,res)=>{
    try{
         
        const {productId}=req.body
        const deletecartproduct=await AddtoCart.findByIdAndDelete(productId)
        res.json({
            message:"Product Successfully Deleted From Cart",
            data:deletecartproduct,
            success:true,
            error:false
        })


    }
    catch(err){
        res.json({
            Message:err?.message || err,
            success:false,
            error:true
        })
    }
}
module.exports=deleteAddToCartProduct