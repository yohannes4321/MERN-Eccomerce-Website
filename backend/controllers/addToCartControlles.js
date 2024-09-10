const addToCartModel = require("../models/CartProduct")
 
const CountAddToCartProduct=async(req,res)=>{
try{
    const userId=req.userId
    const Count =await addToCartModel.countDocuments({
        userId:userId
    })
    res.json({
        data:{
            count:Count
        },
        success:true,
        error:false,
        message:"ok"
    })


}
catch(err){
    res.json({message:err.message || err,
        error:false,
        success:true
    })
}
}
module.exports=CountAddToCartProduct