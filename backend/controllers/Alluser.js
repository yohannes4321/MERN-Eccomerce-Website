 
const Alluser = async(req,res) => {
    try{
    
        res.json({
            message:"All User",
            data:Alluser,
            success:true,
            error:false

    })
    }
    catch(error){
        res.status(400).json({
            message:error.message ||error,
            error:true,
            success:false
    })

    }
}
 
 module.exports=Alluser