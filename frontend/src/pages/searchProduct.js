import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VerticalProductCard from '../componets/verticalProductCard';

const SearchProduct = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');
  const area = new URLSearchParams(location.search).get('area');
  const specialLocation = new URLSearchParams(location.search).get('specialLocation');
  const superSpecialLocation = new URLSearchParams(location.search).get('superSpecialLocation');

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/searchProduct?q=${searchQuery}&area=${area}&specialLocation=${specialLocation}&superSpecialLocation=${superSpecialLocation}`);
      const dataResponse = await response.json();
      setData(dataResponse.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [searchQuery, area, specialLocation, superSpecialLocation]);

  return (
    <div className='container mx-auto p-4'>
      {loading && <p>Loading...</p>}
      {!loading && data.length === 0 && <p>No data found for your search.</p>}
      {!loading && data.length > 0 && (
        <VerticalProductCard data={data} heading={`Search results for "${searchQuery}"`} />
      )}
    </div>
  );
};

export default SearchProduct;
