const userModel = require("../../backend/models/userModel")

const uploadProductPermission=async(userid)=>{
const user=await userModel.findById(userid)

}