import { useState, useEffect } from "react";
import React from 'react';
import logo from "../assest/Spinner@1x-1.0s-200px-200px.gif";
import { Link } from "react-router-dom";
import fetchWiseProduct from '../helper/fetchCategorywiseProduct'; // Assuming these API methods exist
import AddToCart from '../helper/AddtoCart';

const VerticalProductCard = ({ loading: initialLoading = false, data = [], category, heading }) => {
  const [productData, setProductData] = useState(data);
  const [loading, setLoading] = useState(initialLoading);

  const handleToCart = async (e, id) => {
    e.preventDefault();
    try {
      await AddToCart(e, id);
      // Assuming fetchUserDetails is a function to update user state or context
      // fetchUserDetails();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchWiseProduct(category);
      setProductData(categoryProduct?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (category) {
      fetchData(); // Fetch data when category changes
    }
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{heading}</h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <img src={logo} alt="Loading..." className="w-16 h-16 animate-spin" />
          <p className="text-center text-lg font-semibold text-blue-600 mt-2 animate-pulse">
            Loading... Please wait
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {productData.length ? (
            productData.map((product) => (
              <Link
                to={`/product/${product?._id}`}
                key={product?._id}
                className="bg-white border rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={product.productImage[0]}
                    className="object-cover w-full h-full"
                    alt={product.productName || "Product Image"}
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">
                      {product?.productName}
                    </h3>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-red-600 text-lg font-semibold">
                        ${product?.selling?.toFixed(2)}
                      </p>
                      {product?.price > 0 && (
                        <p className="text-gray-500 text-sm line-through">
                          ${product?.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                    {product?.price > 0 && product?.selling < product?.price && (
                      <p className="text-green-600 text-sm font-medium mb-2">
                        Save {((product.price - product.selling) / product.price * 100).toFixed(2)}%
                        (${(product.price - product.selling).toFixed(2)})
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="flex-1 bg-red-600 hover:bg-red-800 text-white py-2 rounded-full text-sm font-semibold transition-all"
                      onClick={(e) => handleToCart(e, product._id)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="flex-1 bg-green-600 hover:bg-green-800 text-white py-2 rounded-full text-sm font-semibold transition-all"
                    >
                      Chat Farmer
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className='bg-white text-lg text-center p-4'>No Products Available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerticalProductCard;
