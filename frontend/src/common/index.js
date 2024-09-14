
import SearchProduct from "../pages/searchProduct";

 const backendapi = "https://mern-eccomerce-website-ya7m.onrender.com"; // Use your actual backend URL
;

const SummaryApi = {
  signUp: {
    url: `${backendapi}/api/signup`,
    method: "post",
  },
  signin: {
    url: `${backendapi}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendapi}/api/user_details`,
    method: "get",
  },
  logout_user:{
    url:`${backendapi}/api/user_logout`,
    method:"get"
  },
  all_user:{
    url:`${backendapi}/api/all_user`,
    method:"get"

  }
  ,
  uploadProduct:{
    url:`${backendapi}/api/upload-product`,
    method:"post"
  },
  getAllProduct:{
    url:`${backendapi}/api/get_all_product`,
    method:"get"
  },
  updateEditProduct:{
    url:`${backendapi}/api/update_Edit_product`,
    method:"post"
  },
  categoryProduct:{
    url:`${backendapi}/api/get_categoryProduct`,
    method:"get"
  },
  categoryWiseCategoryProduct:{
    url:`${backendapi}/api/category_product`,
    method:"post"
  },
  ProductDetails:{
    url:`${backendapi}/api/product_detials`,
    method:"post"
  },
  Add_to_cart:{
    url:`${backendapi}/api/add_to_cart`,
    method:"post"
  },
  Count_Add_TO_CART:{
    url:`${backendapi}/api/count_Add_toCart`,
    method:"get"

  },
  Cart_View_model:{
    url:`${backendapi}/api/view_cart_product`,
    method:"get"
  },
  UpdateCartProduct:{
    url:`${backendapi}/api/update-cart-product`,
    method:"post"
  },
  DeleteAddToCart:{
    url:`${backendapi}/api/delete_add_product`,
    method:"post"
  },
  SearchProduct_Result:{
    url:`${backendapi}/api/search_product`,
    method:"get"
  },
  filter_Product:{
    url:`${backendapi}/api/filter_product`,
    method:"post"
  },
  Forgot_Password:{
    url:`${backendapi}/api/forgot_password`,
    method:"post"
  },
  resetPassword:{
    url:`${backendapi}/api/reset_password/`,
    method:"post"

  }

};

export default SummaryApi;
