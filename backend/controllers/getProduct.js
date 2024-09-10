const ProductModel=require("../models/ProductModel")
const getProductController=async(req,res)=>{
    try{
        const  allproduct=await ProductModel.find().sort({createdAt:-1})
        res.json({message:"All Product",error:false,success:true,data:allproduct})
    }
    catch(err){
        res.status(400).json({
            message: err.message || err,
            success:false,
            error:true

        })
    }
}
module.exports=getProductController