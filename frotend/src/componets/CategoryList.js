import React, { useEffect, useState } from 'react';
import SummariApi from "../common/index";
import logo from "../assest/Spinner@1x-1.0s-200px-200px.gif"; // Ensure the path is correct
import {Link} from "react-router-dom"

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryProduct = async () => {
    try {
      setLoading(true);
      const request = await fetch(SummariApi.categoryProduct.url);
      const response = await request.json();
      setCategoryProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch category products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container p-6 mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Shop by Category</h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <img
            src={logo}
            alt="Loading..."
            className="w-16 h-16 animate-spin"
          />
          <p className="text-center text-lg font-semibold text-blue-600 mt-2 animate-pulse">
            Loading... Please wait
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categoryProduct.map((product, index) => (
            <Link 
              to={`/product-category/${product?.category}`} 
              key={index} 
              className="flex flex-col items-center p-4 hover:shadow-lg transition-shadow ease-in-out duration-300"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full mb-4">
                <img 
                  src={product?.productImage[0]} 
                  alt={product?.category} 
                  className="object-cover w-full h-full rounded-full transition-transform transform hover:scale-110"
                />
              </div>
              <p className="text-center text-sm md:text-base font-medium capitalize mt-2 text-gray-700">{product?.category}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
