const cartProducts=require("../models/CartProduct")
const addToCart=async(req,res)=>{
    try{
         const {productId}=req?.body
         const  currentUser=req.userId

        const isProductAvailable=await cartProducts.findOne({productId})
        if(isProductAvailable){
            return res.json({
                message:"Already Product has Added to cart",
                success:false,
                error:true,
                data:isProductAvailable
            })
        }
        const payload={
            productId:productId,
            quantity:1,
            userId:currentUser
        }
        const newAddToCart=new cartProducts(payload)
        const saveProduct=await newAddToCart.save()
        res.json(
            {
                message:"Product is Added",
                success:true,
                error:false,
                data:saveProduct
            }
        )


        }
    catch(err){
        res.json({
            message:err?.message || err
        })
    }
}
module.exports=addToCart