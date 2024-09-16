import React, { useState } from 'react';
import { IoCloudUploadSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import ProductCategory from "../helper/productcatagory.js";
import uploadImage from "../helper/uploadImage";
import DisplayImage from '../componets/Displayimages'; // Fixed import path
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';

const UploadProduct = ({ onClose, onUploadSuccess }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
    city: "",                 // New field for city
    area: "",                 // New field for area
    specialLocation: "",      // New field for special location
    superSpecialLocation: "" 
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  // Handle deleting an uploaded image
  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData(prev => ({
      ...prev,
      productImage: newProductImage,
    }));
  };

  // Handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
  
    setData(prevData => {
      // Convert specific fields to numbers
      if (name === 'price' || name === 'selling') {
        return {
          ...prevData,
          [name]: value ? parseFloat(value) : '', // Convert to number if not empty
        };
      }
  
      // For other fields, simply update the value as a string
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  

  // Handle file upload
  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];
    try {
      const uploadImageCloudinary = await uploadImage(file);
      setData(prev => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  // Handle product submission
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        onUploadSuccess(); // Notify parent component to refresh product list
        onClose(); // Close the upload modal
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error('Error uploading product:', error);
      toast.error('Failed to upload product');
    }
  };

  return (
    <div className='fixed inset-0 bg-slate-200 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg w-full max-w-3xl h-full max-h-[90%] overflow-y-auto'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold text-gray-800'>Upload Product</h2>
          <div 
            className='cursor-pointer text-3xl text-gray-500 hover:text-red-600' 
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>
        
        {/* Form for uploading product details */}
        <form className='space-y-6' onSubmit={handleSubmitProduct}>
          <div>
            <label htmlFor='productName' className='block text-gray-700 font-medium'>Product Name</label>
            <input 
              type="text" 
              id="productName" 
              name="productName"
              placeholder='Enter Product Name' 
              value={data.productName}
              onChange={handleOnChange}
              className='border border-gray-300 p-3 rounded-md w-full'
              required
            />
          </div>

          <div>
            <label htmlFor='brandName' className='block text-gray-700 font-medium'>Brand Name</label>
            <input 
              type="text" 
              id="brandName" 
              name="brandName"
              placeholder='Enter Brand Name' 
              value={data.brandName}
              onChange={handleOnChange}
              className='border border-gray-300 p-3 rounded-md w-full'
              required
            />
          </div>

          <div>
            <label htmlFor='category' className='block text-gray-700 font-medium'>Category</label>
            <select 
              required
              id="category"
              name="category"
              value={data.category} 
              onChange={handleOnChange}
              className='p-3 w-full bg-slate-200 border border-gray-300 rounded-md'
            >
              <option value="" disabled>Select a Category</option>
              {ProductCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="uploadImageInput" className="block text-gray-700 font-medium">Product Image</label>
            <label
              htmlFor="uploadImageInput"
              className="border border-gray-300 rounded-md w-full bg-slate-100 p-4 cursor-pointer flex flex-col justify-center items-center"
            >
              <IoCloudUploadSharp className="text-4xl text-gray-500" />
              <p className="text-sm text-center mt-2 text-gray-500">
                Click to Upload Product Image
              </p>
              <input
                type="file"
                id="uploadImageInput"
                accept="image/*"
                onChange={handleUploadProductImage}
                className="hidden"
                required
              />
            </label>

            <div className="mt-4">
              {data.productImage.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {data.productImage.map((el, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={el}
                        alt={`Product ${index}`}
                        width={80}
                        height={80}
                        className="bg-slate-100 border border-gray-300 rounded-md cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:flex items-center justify-center cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDeleteForever />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-600">*Please Upload Product Image</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="price" className='block text-gray-700 font-medium'>Price</label>
            <input 
              type="text" 
              id="price" 
              name="price"
              placeholder='Enter Price' 
              value={data.price}
              onChange={handleOnChange}
              className='border border-gray-300 p-3 rounded-md w-full'
              required
            />
          </div>

          <div>
            <label htmlFor="selling" className='block text-gray-700 font-medium'>Selling Price</label>
            <input 
              type="text" 
              id="selling" 
              name="selling"
              placeholder='Enter Selling Price' 
              value={data.selling}
              onChange={handleOnChange}
              className='border border-gray-300 p-3 rounded-md w-full'
              required
            />
          </div>

          <div>
            <label htmlFor="description" className='block text-gray-700 font-medium'>Description</label>
            <textarea
              id="description" 
              name="description"
              placeholder='Enter Description' 
              value={data.description}
              onChange={handleOnChange}
              className='border border-gray-300 p-3 rounded-md w-full h-32 resize-none'
              required
            />
          </div>
          <div className='fixed inset-0 bg-slate-200 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg w-full max-w-3xl h-full max-h-[90%] overflow-y-auto'>
        <form onSubmit={handleSubmitProduct} className='space-y-6'>
          {/* Other input fields */}

          <div>
            <label htmlFor='city' className='block text-gray-700 font-medium'>City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder='Enter City'
              value={data.city}
              onChange={handleOnChange}
              className='border border-gray-300 p-3 rounded-md w-full'
              required
            />
          </div>

          <div>
            <label htmlFor='area' className='block text-gray-700 font-medium'>Area</label>
            <input
              type="text"
              id="area"
              name="area"
              placeholder='Enter Area'
              value={data.area}
              onChange={handleOnChange}
              className='border border-gray-300 p-3 rounded-md w-full'
              required
            />
          </div>

          <div>
            <label htmlFor='specialLocation' className='block text-gray-700 font-medium'>Special Location</label>
            <input
              type="text"
              id="specialLocation"
              name="specialLocation"
              placeholder='Enter Special Location'
              value={data.specialLocation}
              onChange={handleOnChange}
              className='border border-gray-300 p-3 rounded-md w-full'
              required
            />
          </div>

          <div>
            <label htmlFor='superSpecialLocation' className='block text-gray-700 font-medium'>Super Special Location</label>
            <input
              type="text"
              id="superSpecialLocation"
              name="superSpecialLocation"
              placeholder='Enter Super Special Location'
              value={data.superSpecialLocation}
              onChange={handleOnChange}
              className='border border-gray-300 p-3 rounded-md w-full'
              required
            />
          </div>

          <button type="submit" className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600">
            Upload Product
          </button>
        </form>
      </div>
    </div>

          <button type="submit" className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600">
            Upload Product
          </button>
        </form>

        {/* Display image in full screen */}
        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        )}
      </div>
    </div>
  );
};

export default UploadProduct;
