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

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const [isAdminPanelVisible, setAdminPanelVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchParams = new URLSearchParams(useLocation().search);
  const [search, setSearch] = useState({
    area: searchParams.get('area') || '',
    specialLocation: searchParams.get('specialLocation') || '',
    superSpecialLocation: searchParams.get('superSpecialLocation') || '',
    product: searchParams.get('q') || '',
    selectedLocation: searchParams.get('selectedLocation') || '',
  });
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

  const handleDropdownClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLocationSelect = (location) => {
    setSearch({ ...search, selectedLocation: location });
    setIsDropdownVisible(false); // Hide dropdown after selection
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
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

 


  useEffect(() => {
    context.fetchUserDetails();
    context.fetchUserAddToCart(); // Initial load for cart count
  }, [context]);

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
        <div className={`w-full max-w-3xl mx-auto ${isSearchVisible ? 'block' : 'hidden'} md:flex md:items-center md:justify-between`}>
          <div className="flex flex-col md:flex-row md:space-x-4 p-4 bg-white rounded-lg shadow-lg border border-gray-300">
            <input
              type="text"
              name="product"
              placeholder="Search for a product..."
              value={search.product}
              onChange={handleSearch}
              className="h-8 px-3 border border-gray-300 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-red-600 md:w-64"
            />
            <div className="relative flex-grow">
              <input
                type="text"
                value={search.selectedLocation}
                placeholder="Search location..."
                className="h-8 px-3 border border-gray-300 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                onChange={(e) => {
                  setSearch({ ...search, selectedLocation: e.target.value });
                  setIsDropdownVisible(true); // Show dropdown when user starts typing
                }}
                onFocus={() => setIsDropdownVisible(true)}
                // Removed onBlur to prevent it from hiding the dropdown prematurely
              />
              {isDropdownVisible && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg">
                  {LocationCategory.filter((loc) =>
                    loc.label.toLowerCase().includes(search.selectedLocation.toLowerCase())
                  ).map((loc) => (
                    <button
                      key={loc.id}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100"
                      onClick={() => handleLocationSelect(loc.label)}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              type="text"
              name="specialLocation"
              placeholder="Enter Specific Place"
              value={search.specialLocation}
              onChange={handleSearch}
              className="h-8 px-3 border border-gray-300 rounded flex-grow md:block hidden focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              onClick={handleSubmit}
              className="h-8 px-3 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              Search
            </button>
          </div>
        </div>

        {/* User Icon, Cart, and Login/Logout */}
        <div className="flex justify-between items-center">
          <div
            className="relative mr-4"
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
                {context.cartItemCount || 0}
              </div>
            </Link>
          </div>

          {/* Login/Logout */}
          {user ? (
            <button
              className="text-red-600 hover:text-red-800 transition-colors duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-red-600 hover:text-red-800 transition-colors rounded-full duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
