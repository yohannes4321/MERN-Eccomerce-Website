import React, { useState, useEffect, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify
import fetchWiseProduct from '../helper/fetchCategorywiseProduct';
import logo from "../assest/Spinner@1x-1.0s-200px-200px.gif"; 
import { Link } from 'react-router-dom';
import AddToCart from '../helper/AddtoCart';
import Context from '../context';
import { useNavigate } from 'react-router-dom';

const StandardCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleClick = () => {
    window.location.href = 'http://localhost:3001/';
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    try {
        console.log("Adding to cart, product ID:", productId); // Debug log
        const addToCartResponse = await AddToCart(e, productId);
        console.log("Add to cart response:", addToCartResponse); // Debug log
        if (addToCartResponse.success) {
            toast.success(addToCartResponse.message);
            context.fetchUserAddToCart(); // Ensure context is updated correctly
        } else {
            toast.error(addToCartResponse.message);
        }
    } catch (error) {
        toast.error("Failed to add to cart. Please try again.");
        console.error("Error adding to cart:", error);
    }
};
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchWiseProduct(category);
      setData(categoryProduct?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{heading}</h2>

      <ToastContainer />

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <img src={logo} alt="Loading..." className="w-16 h-16 animate-spin" />
          <p className="text-center text-lg font-semibold text-blue-600 mt-2 animate-pulse">
            Loading... Please wait
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.map((product) => {
            const price = product?.price || 0;
            const sellingPrice = product?.selling || 0;
            const savings = price - sellingPrice;
            const discountPercentage = price > 0 ? ((savings / price) * 100).toFixed(2) : 0;

            return (
              <Link 
                to={"/product/" + product?._id} 
                key={product?._id} 
                className="bg-white border rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <div className="w-full h-56 overflow-hidden">
                  <img 
                    src={product.productImage[0]} 
                    className="object-cover w-full h-full"
                    alt={product.productName} 
                  />
                </div>

                <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between">
  <div className="mb-6">
    {/* Product Name */}
    <h3 className="text-2xl font-bold text-gray-900 truncate mb-3">
      {product?.productName}
    </h3>

    {/* Price and Discount */}
    <div className="flex items-baseline justify-between mb-3">
      <p className="text-3xl font-semibold text-red-600">
        ${sellingPrice.toFixed(2)}
      </p>
      {price > 0 && (
        <p className="text-lg text-gray-500 line-through">
          ${price.toFixed(2)}
        </p>
      )}
    </div>

    {/* Savings and Discount */}
    {discountPercentage > 0 && (
      <p className="text-lg text-green-600 font-medium">
        Save {discountPercentage}% (${savings.toFixed(2)})
      </p>
    )}
  </div>

  {/* Buttons */}
  <div className="flex space-x-4 mt-4">
    {/* Add to Cart Button */}
    <button 
      className="flex-1 bg-red-600 hover:bg-red-800 text-white py-3 px-5 rounded-full text-base font-semibold transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg" 
      onClick={(e) =>handleAddToCart(e, product?._id)}
    >
      Add to Cart
    </button>

    {/* Chat Farmer & Product Details Button */}
    <button 
      className="flex-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white py-3 px-5 rounded-full text-base font-bold transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg"
     
    >
      Chat Farmer & Product Details
    </button>
  </div>
</div>


              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StandardCardProduct;
