import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context/index';
import { GoogleLogin } from '@react-oauth/google';
import loginIcons from '../assest/signin.gif';
import SummaryApi from '../common/index';

const clientId = "496980908522-nq15sj8ga0r4f1nkul60db19bh9l678m.apps.googleusercontent.com";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { fetchUserDetails } = useContext(Context);

    // Handle Google Login success
    const onSuccess = async (response) => {
        try {
            const googleToken = response.credential; // OAuth token from Google
            const res = await fetch(SummaryApi.googleSignIn.url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: googleToken }),
            });
            const result = await res.json();
            if (result.success) {
                toast.success("Login successful!");
                fetchUserDetails();  // Fetch user details after Google login
                navigate('/');       // Redirect after login
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Google login failed:", error);
            toast.error("Login failed!");
        }
    };

    const onFailure = (error) => {
        console.error("Google login failed:", error);
        toast.error("Login failed!");
    };

    // Handle form input change
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.signin.url, {
                method: SummaryApi.signin.method,
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.success) {
                toast.success(result.message);
                fetchUserDetails();
                navigate('/');
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
                            <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <GoogleLogin
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        clientId={clientId}
                    />
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
