import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context/index'; // Your Context file
import loginIcons from '../assest/signin.gif';
import SummaryApi from '../common/index'; // Your API setup

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context); // Make sure Context is providing the fetchUserDetails

  // Handle input change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.signin.url, {
        method: SummaryApi.signin.method, // Should be 'POST'
        headers: { "Content-Type": "application/json" },
        credentials: 'include', // If you're using cookies for authentication
        body: JSON.stringify(data), // Send email and password in body
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        fetchUserDetails(); // Fetch user details after login success
        navigate('/'); // Redirect user to homepage or dashboard
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div id="login" className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl text-center font-bold">Login</h1>
        <div className="w-24 h-24 mx-auto my-5">
          <img src={loginIcons} alt="login icon" className="rounded-full" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              required
              className="w-full p-2 bg-gray-100 rounded-md focus:ring-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <div className="flex items-center bg-gray-100 rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                required
                className="w-full p-2 bg-gray-100"
              />
              <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer p-2">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          
          <Link to="/forgot-password" className="text-right block text-sm text-blue-600">Forgot Password?</Link>
          <button type="submit" className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md">
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/sign-up" className="text-blue-600">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
