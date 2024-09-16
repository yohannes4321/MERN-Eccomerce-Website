import React, { useState, useContext, useEffect } from 'react';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import Context from '../context/index';
import AddToCart from '../helper/AddtoCart';
import LocationCategory from '../helper/';

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
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        credentials: 'include',
      });
      const user = await response.json();
      if (!user.success) {
        toast.error("🔒 You must log in first to access the Admin Panel.");
        navigate('/login');
      } else {
        navigate('/admin-panel');
      }
    } catch (err) {
      console.error('Error fetching user for admin panel:', err);
    }
  };

  const handleDropdownClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLocationSelect = (location) => {
    setSearch({ ...search, selectedLocation: location });
    setIsDropdownVisible(false);
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams(search).toString();
    navigate(`/search?${queryParams}`);
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault(); // Prevent default action if necessary
    try {
      const addToCartResponse = await AddToCart(e, productId);
      if (addToCartResponse.success) {
        toast.success(addToCartResponse.message);
        context.fetchUserAddToCart(); // Update cart count dynamically
      } else if (addToCartResponse.error) {
        toast.error(addToCartResponse.message);
      }
    } catch (error) {
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  useEffect(() => {
    context.fetchUserDetails();
    context.fetchUserAddToCart(); // Initial load for cart count
  }, [context]);

  return (
    <header className="h-16 shadow-md bg-white px-3">
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
            {/* Product Input */}
            <input
              type="text"
              name="product"
              placeholder="Search for a product..."
              value={search.product}
              onChange={handleSearch}
              className="h-8 px-3 border border-gray-300 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-red-600 md:w-64"
              required
            />
            <div className="relative flex-grow">
              {/* Location Input Field */}
              <input
                type="text"
                value={search.selectedLocation}
                placeholder="Search location..."
                className="h-8 px-3 border border-gray-300 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                onChange={(e) => {
                  setSearch({ ...search, selectedLocation: e.target.value });
                  setIsDropdownVisible(true); // Show dropdown when typing
                }}
                onFocus={() => setIsDropdownVisible(true)} // Show dropdown when input is clicked/focused
                onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)} // Hide dropdown after blur with delay for selection
              />

              {/* Dropdown Menu */}
              {isDropdownVisible && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg">
                  {/* If the user has typed, filter the locations */}
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

                  {/* If No Match Found */}
                  {LocationCategory.filter((loc) =>
                    loc.label.toLowerCase().includes(search.selectedLocation.toLowerCase())
                  ).length === 0 && (
                    <div className="w-full text-left px-3 py-2 text-gray-500">
                      No locations found
                    </div>
                  )}

                  {/* If Input is Empty or Not Filtering, Show All Locations */}
                  {!search.selectedLocation && 
                    LocationCategory.map((loc) => (
                      <button
                        key={loc.id}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => handleLocationSelect(loc.label)}
                      >
                        {loc.label}
                      </button>
                    ))
                  }
                </div>
              )}
            </div>

            {/* Special Location Input - Hidden on Mobile */}
            <input
              type="text"
              name="specialLocation"
              placeholder="Enter Specific Place"
              value={search.specialLocation}
              onChange={handleSearch}
              className="h-8 px-3 border border-gray-300 rounded flex-grow md:block hidden focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            {/* Search Button */}
            <button
              className="h-8 w-12 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
              onClick={handleSubmit}
            >
              <FaSearch aria-label="Search" />
            </button>
          </div>
        </div>

        {/* Search Icon for Small Screens */}
        {!isSearchVisible && (
          <button
            className="md:hidden text-2xl text-gray-700 hover:text-red-600 cursor-pointer transition-colors duration-300"
            onClick={toggleSearch}
          >
            <FaSearch />
          </button>
        )}

        {/* User Icon, Cart, and Login/Logout */}
        <div className='flex justify-between items-center'>
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
              <Link to="/login">
                <FaUser className="text-2xl cursor-pointer text-gray-700 hover:text-red-600 transition-colors duration-300" />
              </Link>
            )}

            {isAdminPanelVisible && user && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={handleAdminPanelClick}
                >
                  Admin Panel
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <Link to="/cart">
            <div className="relative text-gray-700 hover:text-red-600 transition-colors duration-300">
              <FaShoppingCart className="text-2xl" />
              {/* Assuming cartCount is available in context */}
              {context.cartCount > 0 && (
                <span className="absolute top-0 right-0 block w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  {context.cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
