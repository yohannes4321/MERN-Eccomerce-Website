import React, { useContext, useState } from 'react';
  // Correct the asset path if needed
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify'; // To make pop-up notifications
import Context from '../context/index'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        
    });
    const navigate = useNavigate();
    const { fetchUserDetails } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataRequest = await fetch(SummaryApi.Forgot_Password.url, {
            method: SummaryApi.Forgot_Password.method,
            headers: {
                "Content-Type": "application/json"
            },
            // Ensure cookies are sent with the request
            body: JSON.stringify(data)
        });

        const dataResponse = await dataRequest.json();
        if (dataResponse.success) {
            toast.success(dataResponse.message);
            navigate('/reset_password/:id/:token');
            fetchUserDetails()
        }
        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    };

    return (
        <div id="login" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-200 to-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h2 className=' text-center font-serif text-4xl '>Forgot Password </h2>

                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter Email"
                                name="email"
                                value={data.email}
                                required
                                onChange={handleOnChange}
                                className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-50 border border-gray-300"
                            />
                        </div>
                    </div>

                    
                    

                    

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="bg-red-600 text-white py-2 px-6 rounded-full w-full max-w-[150px] mx-auto block hover:scale-105 hover:shadow-md text-center transition-transform"
                    >
                        Send
                    </button>
                </form>

               
            </div>
        </div>
    );
};

export default Login;
