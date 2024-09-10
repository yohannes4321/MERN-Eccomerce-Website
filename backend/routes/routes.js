const express = require('express');
const router = express.Router();
const userDetail = require('../controllers/userDetail');
const authToken = require("../controllers/middleware/authtoken");
const userSignUpController = require("../controllers/userSignUp");
const userSignInController = require("../controllers/userSignin");
const userLogout = require('../controllers/userLogout');
const Alluser=require('../controllers/Alluser');
const getProductController=require('../controllers/getProduct');
const uploadSubmitProduct = require('../controllers/uploadSubmitProduct');
const updateProductController =require("../controllers/updateProduct")
const singleCategoryProduct =require("../controllers/singleCategoryProduct")
const getcategoryWiseProduct=require("../controllers/getcatagorywiseProduct")
const getProductDetails=require("../controllers/ProductDetails")
const addToCart =require("../controllers/addToCart")
const AddtocartviewProduct=require("../controllers/addToCartViewProduct")
const CountAddToCartProduct=require("../controllers/addToCartControlles")
const updateAddToCartProduct=require("../controllers/updateAddToCart")
const deleteAddToCartProduct=require("../controllers/deleteAddToCart")
const search=require("../controllers/SearchProduct")
const filterProductController=require('../controllers/filterproduct');
const ForgetPassword = require('../controllers/ForgetPassword');
const resetPassword = require('../controllers/resetpassword');


router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user_details", authToken, userDetail);
router.get("/user_logout",userLogout)
router.get('/all_user',authToken,Alluser)


//product
router.post("/upload-product",authToken,uploadSubmitProduct)
router.get("/get_all_product",getProductController)
router.post("/update_Edit_product",updateProductController)
router.get("/get_categoryProduct", singleCategoryProduct)
router.post("/category_product",getcategoryWiseProduct)
router.post ("/product_detials",getProductDetails)

// add to cart
router.post("/add_to_cart",authToken,addToCart,)
router.get("/count_Add_toCart",authToken,CountAddToCartProduct)
router.get("/view_cart_product",authToken,AddtocartviewProduct)
//view cartupdate
router.post("/update-cart-product",authToken,updateAddToCartProduct)
// delete addToCartProduct
router.post("/delete_add_product",authToken,deleteAddToCartProduct)


//search
router.get("/search_product",search)

//filter
router.post("/filter_product",filterProductController)
//forget password
router.post("/forgot_password",ForgetPassword)
//reset password
router.post("/reset_password",resetPassword)
module.exports = router;


