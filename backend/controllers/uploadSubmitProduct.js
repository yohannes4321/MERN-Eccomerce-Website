const productModel=require("../models/ProductModel")
async function uploadSubmitProduct(req,res){
    try{
        const uploadProduct =new productModel(req.body)
        const saveProduct=await uploadProduct.save()
        res.status(201).json({
            message:"Product is Saved Successfully",
            success:true,
            error:false,
            data:saveProduct
        })
    }
    catch(err){
        console.error("Upload Product Error:", err);
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
    }

module.exports=uploadSubmitProduct