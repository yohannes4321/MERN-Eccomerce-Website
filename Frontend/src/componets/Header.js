import React, { useState, useContext, useEffect } from 'react';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import Context from '../context/index';
import AddToCart from '../helper/AddtoCart';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const [isAdminPanelVisible, setAdminPanelVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const searchParams = new URLSearchParams(useLocation().search);
  const [search, setSearch] = useState(searchParams.get('q') || '');

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const context = useContext(Context);

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
        toast.error("🔒 You must log in first to access the Admin Panel and add products.");
        navigate('/login');
      } else {
        navigate('/admin-panel');
      }
    } catch (err) {
      console.error('Error fetching user for admin panel:', err);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate(`/search`);
    }
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
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className={`text-2xl font-extrabold text-gray-800 ${isSearchVisible ? 'hidden' : 'block'}`}>
          <Link to="/" className="hover:text-red-600 transition-colors duration-300">
            ShopEasy
          </Link>
        </div>

        {/* Search Bar */}
        <div
          className={`flex items-center w-full max-w-lg relative ${
            isSearchVisible ? 'block' : 'hidden'
          } md:flex`}
        >
          <input
            type="text"
            placeholder="Search products..."
            className="w-full h-10 px-4 text-gray-700 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-red-600"
            onChange={handleSearch}
            value={search}
          />
          <button className="h-10 w-12 bg-red-600 text-white flex items-center justify-center rounded-r-full hover:bg-red-700 transition-colors duration-300">
            <FaSearch aria-label="Search" />
          </button>
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
            <Link to="/login">
              <FaUser className="text-2xl text-gray-700 hover:text-red-600 cursor-pointer transition-colors duration-300" />
            </Link>
          )}

          {/* Admin Panel Dropdown */}
          {isAdminPanelVisible && user && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded p-4 z-10">
              <Link
                to="/admin-panel"
                className="block text-gray-700 hover:bg-slate-200 p-2 rounded transition-colors duration-300"
              >
                Admin Panel
              </Link>
            </div>
          )}
        </div>

        {/* Shopping Cart with Badge */}
        <div className="relative cursor-pointer" onClick={() => context.fetchUserAddToCart()}>
          <Link to="/cart">
            <FaShoppingCart className="text-2xl text-gray-700 hover:text-red-600  transition-colors duration-300" />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold">{context.cartProductCount}</span>
            </div>
          </Link>
        </div>

        {/* Login/Logout Buttons */}
        <div>
          {user?._id ? (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
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
