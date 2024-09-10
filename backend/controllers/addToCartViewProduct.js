const AddToCartModel=require("../models/CartProduct")
const addToCartProduct=async(req,res)=>{
    try{
        const userId=req.userId
         const allProduct=await AddToCartModel.find({userId:userId}).populate("productId")
         
    res.json({
        data:allProduct,
        message:"All Added Products",
        success:true,
        error:false
        
    })
    }
    catch(err){
        res.json({message:err.message || err,
            error:true,
            success:false
        })
    }
}
module.exports=addToCartProduct