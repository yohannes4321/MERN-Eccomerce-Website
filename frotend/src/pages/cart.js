import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context/index';
import { MdDelete } from "react-icons/md";
import {Link} from "react-router-dom"
const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.Cart_View_model.url, {
        method: SummaryApi.Cart_View_model.method,
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Increase quantity of product
  const Increaseqty = async (id, quantity) => {
    try {
      const response = await fetch(SummaryApi.UpdateCartProduct.url, {
        method: SummaryApi.UpdateCartProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ productId: id, quantity: quantity + 1 }),
      });
      const result = await response.json();
      if (result.success) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Decrease quantity of product
  const deacrseqty = async (id, quantity) => {
    const response = await fetch(SummaryApi.UpdateCartProduct.url, {
      method: SummaryApi.UpdateCartProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ productId: id, quantity: quantity - 1 }),
    });
    const result = await response.json();
    if (result.success) {
      fetchData();
    }
  };

  // Delete product from cart
  const deleteAddToCart = async (id) => {
    try {
      const response = await fetch(SummaryApi.DeleteAddToCart.url, {
        method: SummaryApi.DeleteAddToCart.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ productId: id }),
      });
      const result = await response.json();
      console.log("delete result", result);
      if (result.success) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting product from cart:', error);
    }
  };

  // Calculate Total Quantity and Price
  const totalQuantity = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity, 
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.selling, 0
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-3xl font-bold my-8">Your Cart</h2>

      {data.length === 0 && !loading && (
        <p className="text-center text-gray-500">No items in your cart.</p>
      )}

      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div className="w-full lg:w-2/3">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={index}
                  className="w-full bg-gray-200 h-32 my-2 border border-slate-300 animate-pulse rounded-lg"
                ></div>
              ))
            : data.map((product) => {
                const productImage =
                  product?.productId?.productImage?.length > 0
                    ? product.productId.productImage[0]
                    : null;

                return (
                  <div
                    key={product?._id}
                    className="relative w-full bg-white h-auto my-4 p-4 rounded-lg shadow-md flex items-center"
                  >
                    <div className="w-32 h-32">
                      {productImage ? (
                        <img
                          src={productImage}
                          alt={product?.productId?.productName || 'Product Image'}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex-1">
                      <h2 className="text-lg lg:text-xl font-semibold text-red-600 truncate mb-2 capitalize">
                        {product?.productId?.productName || 'Unnamed Product'}
                      </h2>
                      <h3 className="text-lg font-medium text-gray-700">
                        {product?.productId?.category || 'Unnamed Category'}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-gray-800 mb-4">
                          {product?.productId?.selling.toFixed(2)} Birr
                        </p>
                        <p className="text-xl font-bold text-gray-800 mb-4">
                          {(product?.productId?.selling * product?.quantity).toFixed(2)} Birr
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 border border-red-600 text-red-600 w-10 h-10 flex justify-center items-center rounded-full hover:bg-red-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110"
                          onClick={() => deacrseqty(product?._id, product?.quantity)}
                        >
                          -
                        </button>
                        <span className="text-lg font-medium text-gray-800">
                          {product?.quantity}
                        </span>
                        <button
                          className="p-2 border border-red-600 text-red-600 w-10 h-10 flex justify-center items-center rounded-full hover:bg-red-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110"
                          onClick={() => Increaseqty(product?._id, product?.quantity)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Delete icon placed in the top-right corner */}
                    <button
                      className="absolute top-4 right-4 p-2 text-red-600 rounded-full hover:bg-gray-100"
                      onClick={() => deleteAddToCart(product?._id)}
                    >
                      <MdDelete size={24} />
                    </button>
                  </div>
                );
              })}
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-1/3 lg:ml-4 mt-8 lg:mt-0">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-auto bg-white shadow-md rounded-lg p-4">
              <h2 className="text-white bg-red-600 px-4 py-2 rounded-t-lg text-xl font-semibold">Summary</h2>
              <div className="mt-4">
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Total Quantity:</p>
                  <p className="text-lg font-bold text-gray-800">{totalQuantity}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-lg font-semibold">Total Price:</p>
                  <p className="text-lg font-bold text-gray-800">{totalPrice.toFixed(2)} Birr</p>
                </div>
                <div className="mt-8">
                <Link to={`/payment/${totalPrice.toFixed(2)}`}>
  <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300">
    Proceed to Payment
  </button>
</Link>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default Cart;
