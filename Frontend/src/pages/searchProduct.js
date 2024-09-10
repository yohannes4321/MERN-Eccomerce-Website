import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SummariApi from '../common/index';
import VerticalProductCard from '../componets/verticalProductCard'; // Check the path here


const SearchProduct = () => {
  const location = useLocation(); // Get the location object
  const searchQuery = new URLSearchParams(location.search).get('q'); // Extract the search query parameter

  // State for managing the fetched data and loading state
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false);

  // Function to fetch products
  const fetchProduct = async () => {
    if (!searchQuery) return; // Avoid fetching if there's no search query
    setLoading(true);
    try {
      const response = await fetch(SummariApi.SearchProduct_Result.url + `?q=${searchQuery}`);
      const dataResponse = await response.json(); 
      setData(dataResponse.data); // Set the fetched data
    } catch (error) {
      console.error('Error fetching product data:', error);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  // Fetch data whenever the search query changes
  useEffect(() => {
    fetchProduct();
  }, [searchQuery]);
  
  console.log('Data:', data);
  console.log('Loading:', loading);
  

  return (
    <div className='container mx-auto p-4'>
      {loading && <p>Loading...</p>}  {/* Show loading spinner */}
      
      <p className='text-lg font-semibold my-3'>Search Results: {data.length}</p>  {/* Display result count */}

      {/* If no data and not loading, show "No Data Found" */}
      {!loading && data.length === 0 && (
        <p className='bg-white text-lg text-center p-4'>No Data Found</p>
      )}

      {/* Pass the fetched data to the VerticalProductCard component */}
      {!loading && data.length !== 0 && (
         <VerticalProductCard loading={loading} data={data} heading={`Search results for "${searchQuery}"`} />

      )}
    </div>
  );
};

export default SearchProduct;
