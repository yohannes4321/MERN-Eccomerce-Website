import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPage from "../pages/AdminPage";
import AllUser from "../pages/AllUsers";
import Products from "../pages/Products";
import Cart from "../pages/cart"
import CategoryProduct from "../pages/CategoryProduct"
import ProductDetials from "../pages/ProductDetials";
import SearchProduct from "../pages/searchProduct"
import ResetPassword from "../componets/resetPassword"
import PaymentPage from "../pages/PaymentPage"; 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "", // Root path
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },{
        path:"product-category/:categoryName",
        element:<CategoryProduct/>

      },
   
      {
        path : "product-category",
        element : <CategoryProduct/>
    },
      {
        path:"cart",
        element:<Cart/>
      },
      {path:"search",
        element:<SearchProduct/>
      },
       {
        path:"product/:id",
        element:<ProductDetials/>
       },
       {
        path:"reset_password/:id/:token",
        element:<ResetPassword/>
       },
       {
        path: "payment/:money",
        element: <PaymentPage />,  // Capitalized component
      },

      {
        path: "admin-panel",
        element: <AdminPage />,
        children: [
          {
            path: "all_users",  // Correct path key for all_users
            element: <AllUser />,  // Correct element key
          },
          {
            path: "products",
            element: <Products />,
          },
        ],
      },
    ],
  },
]);

export default router;
