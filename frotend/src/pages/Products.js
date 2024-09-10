import React, { useEffect, useState } from 'react';
import UploadProduct from '../componets/UploadProduct';
import SummaryApi from '../common/index';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "../componets/AdminEditProduct";

const Products = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(SummaryApi.getAllProduct.url, {
        method: SummaryApi.getAllProduct.method,
        credentials: "include"
      });
      const data = await response.json();
      setAllProduct(data?.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setAllProduct([]);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleUploadSuccess = () => {
    fetchAllProducts(); // Refresh product list after successful upload
  };

  return (
    <div className='bg-gray-100 min-h-screen p-6'>
      <div className='bg-white py-2 px-4 flex justify-between items-center shadow-sm rounded-md'>
        <h2 className='font-bold text-lg text-gray-800'>All Products</h2>
        <button
          className='border-2 py-1 px-3 hover:bg-red-600 hover:text-white transition-all border-red-600 text-red-600 rounded-full'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Products
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
        {allProduct.length > 0 ? (
          allProduct.map((product, index) => (
            <div key={index} className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
              <img src={product?.productImage[0]} alt={product.productName} className='w-full h-40 object-cover rounded-md' />
              <h1 className='mt-4 font-semibold text-gray-700 text-center'>{product.productName}</h1>
              <p classname='font-bold'>{product.selling}</p>
              <div
                className='w-fit ml-auto p-2 bg-green-200 hover:bg-green-600 cursor-pointer hover:text-white rounded-full mt-4'
                onClick={() => setEditProduct(product)} // Pass the product to be edited
              >
                <MdModeEditOutline className='text-xl' />
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500'>No products available.</p>
        )}
      </div>

      {editProduct && (
        <AdminEditProduct
        datacollected={editProduct}
          onClose={() => setEditProduct(null)} // Close the edit modal
          onUploadSuccess={handleUploadSuccess} // Refresh the product list after editing
          fetchAllProducts={fetchAllProducts} // Pass the fetchAllProducts function to update the product list
        />
      )}

      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          onUploadSuccess={handleUploadSuccess} // Pass the callback to UploadProduct
        />
      )}
    </div>
  );
};

export default Products;
