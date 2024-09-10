import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify'; // to make pop-up notifications
import Context from '../context/index';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails } = useContext(Context);

    const onSuccess = (response) => {
        console.log("Login Success! Current user:", response);
        toast.success("Login successful!");
        // Navigate or fetch user details on success
    };

    const onFailure = (response) => {
        console.log("Login Failed:", response);
        toast.error("Login failed!");
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataRequest = await fetch(SummaryApi.signin.url, {
            method: SummaryApi.signin.method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include', // Ensure cookies are sent with the request
            body: JSON.stringify(data)
        });

        const dataResponse = await dataRequest.json();
        if (dataResponse.success) {
            toast.success(dataResponse.message);
            navigate('/');
            fetchUserDetails();
        } else {
            toast.error(dataResponse.message);
        }
    };

    return (
        <div id="login" className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl text-center font-bold text-red-600 bg-gradient-to-r from-red-400 to-yellow-500 bg-clip-text text-transparent">
                    Login
                </h1>
                <div className="w-24 h-24 mx-auto my-5">
                    <img src={loginIcons} alt="login icon" className="rounded-full" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
                        <div className="bg-slate-100 p-2 rounded-md">
                            <input
                                type="text"
                                id="email"
                                placeholder="Enter Email"
                                name="email"
                                value={data.email}
                                required
                                onChange={handleOnChange}
                                className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password:</label>
                        <div className="bg-slate-200 p-2 gap-3 flex rounded-md items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter Password"
                                value={data.password}
                                name="password"
                                required
                                onChange={handleOnChange}
                                className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                            <div
                                className="cursor-pointer text-gray-600 hover:text-red-600"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                            </div>
                        </div>
                    </div>

                    {/* Google Login Button */}
                    <div id="signInButton" className="mb-4">
                        <GoogleLogin
                            onSuccess={onSuccess}
                            onError={onFailure}
                        />
                    </div>

                    <Link
                        to="/forgot-password"
                        className="block text-right text-xl text-gray-600 hover:underline hover:text-red-600 mb-6"
                    >
                        Forgot Password?
                    </Link>

                    <button
                        type="submit"
                        className="bg-red-600 text-white py-2 px-6 rounded-full w-full max-w-[150px] mx-auto block hover:scale-105 hover:shadow-md transition-all"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link to="/sign-up" className="text-red-600 text-xl font-medium hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
