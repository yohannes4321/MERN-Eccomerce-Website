import React, { useState, useContext, useEffect } from 'react';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import Context from '../context/index';
import AddToCart from '../helper/AddtoCart';
import LocationCategory from '../helper/LocationCategory';
import VerticalProductCard from '../componets/verticalProductCard';
function Header() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const [isAdminPanelVisible, setAdminPanelVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchParams = new URLSearchParams(useLocation().search);
   
    
    const [search, setSearch] = useState({
      product: '',
      selectedLocation: '',
    });
  
    const [loading, setLoading] = useState(false);

 
  const context = useContext(Context);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        dispatch(setUserDetails(null));
        context.fetchUserAddToCart(); // Update cart count dynamically after logout
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const handleAdminPanelClick = async () => {
    if (user) {
      navigate('/admin-panel/products');
    } else {
      toast.warn('You must log in first!');
      navigate('/login');
    }
  };

 
  const handleSubmit = () => {
    const filteredSearchParams = {};
    
    // Only include params that have values
    Object.keys(search).forEach((key) => {
      if (search[key]) {
        filteredSearchParams[key] = search[key];
      }
    });
  
    const queryParams = new URLSearchParams(filteredSearchParams).toString();
    navigate(`/search?${queryParams}`);
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
const handleSearch = (e) => {
  setSearch({ ...search, product: e.target.value });
};

const handleLocationSearch = (e) => {
  setSearch({ ...search, selectedLocation: e.target.value });
};

const handleLocationSelect = (location) => {
  setSearch({ ...search, selectedLocation: location });
  setIsDropdownVisible(false); // Hide dropdown when a location is selected
};

  useEffect(() => {
    context.fetchUserDetails();
    // Initial load for cart count
  }, [context,search.product, search.selectedLocation]);

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className={`text-2xl font-extrabold text-gray-800 ${isSearchVisible ? 'hidden' : 'block'}`}>
          <Link to="/" className="hover:text-red-600 transition-colors duration-300">
            ShopEasy
          </Link>
        </div>
  {/* Search Bar */}
  <div className='flex items-center gap-6'>
        <input
          type='text'
          placeholder='Search for a product...'
          value={search.product}
          onChange={handleSearch}
          className='h-8 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 md:w-64'
        />
        <div className='relative'>
          <input
            type='text'
            value={search.selectedLocation}
            placeholder='Search location...'
            className='h-8 px-3 border border-gray-300 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-red-600'
            onChange={handleLocationSearch}
            onFocus={() => setIsDropdownVisible(true)}
          />
          {isDropdownVisible && (
            <div className='absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg'>
              {/* Display a dropdown for location suggestions */}
              {LocationCategory.filter((loc) =>
                loc.label.toLowerCase().includes(search.selectedLocation.toLowerCase())
              ).map((loc) => (
                <button
                  key={loc.id}
                  className='w-full text-left px-3 py-2 hover:bg-gray-100'
                  onClick={() => handleLocationSelect(loc.label)}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Results */}
      {loading && <p>Loading...</p>}
      {!loading && data.length === 0 && <p>No data found for your search.</p>}
      {!loading && data.length > 0 && (
        <VerticalProductCard data={data} heading={`Search results for "${search.product}"`} />
      )}
    </div>
        {/* User Icon, Cart, and Login/Logout */}
       {/* User Icon, Cart, and Login/Logout */}
<div className="flex items-center gap-6">
  <div
    className="relative"
    onMouseEnter={() => setAdminPanelVisible(true)}
    onMouseLeave={() => setAdminPanelVisible(false)}
  >
    {user?.profilePic ? (
      <img
        src={user.profilePic}
        className="w-12 h-12 rounded-full cursor-pointer"
        alt={user?.name || 'User Profile'}
        onClick={handleAdminPanelClick}
      />
    ) : (
      <FaUser
        className="text-2xl cursor-pointer text-gray-700 hover:text-red-600 transition-colors duration-300"
        onClick={handleAdminPanelClick}
      />
    )}
    {isAdminPanelVisible && user && (
      <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
        <button
          className="w-full px-4 py-2 text-left hover:bg-gray-100"
          onClick={handleAdminPanelClick}
        >
          Admin Panel
        </button>
      </div>
    )}
  </div>

  {/* Shopping Cart with Badge */}
  <div className="relative cursor-pointer" onClick={() => context.fetchUserAddToCart()}>
    <Link to="/cart">
      <FaShoppingCart className="text-2xl text-gray-700 hover:text-red-600 transition-colors duration-300" />
      <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
        {context.cartProductCount}
      </div>
    </Link>
  </div>

  {/* Login/Logout */}
  {user ? (
    <button
      className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
      onClick={handleLogout}
    >
      Logout
    </button>
  ) : (
    <Link
      to="/login"
      className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
    >
      Login
    </Link>
  )}
</div>
      
    </header>
  );
}

export default Header;
