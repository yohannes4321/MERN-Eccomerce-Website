import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import  SummaryApi from '../common/index'
import { toast } from 'react-toastify';
// read image and change to url
const imagetobase64 = async (image) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);

  const data = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  return data;
};

const SignUp = () => {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    fullname: "",
    conformpassword: "",
    profilePic: "",
    role: "customer", 
     
  });
// to save the previous and current data
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
// submit on click
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (data.password=== data.conformpassword){
      const dataresponce=await fetch(SummaryApi.signUp.url,{
        method:SummaryApi.signUp.method,
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(data)

      })
      const datares=await dataresponce.json()
      if (datares.success){
        toast.success(datares.message)
        navigate('/login')
      }
      if(datares.error){
        toast.error(datares.message)
      }

    }
    else{
      throw new Error("Please check password and Conform password it is not the Identical")
    }
    // Handle form submission
  };
// upload the first image url that has been change from 64hex
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await imagetobase64(file);
      console.log(imagePic);
      setData((prev) => ({
        ...prev,
        profilePic: imagePic,
      }));
    }
  };

  return (
    <div id="sign-up" className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h1 className="text-3xl text-center font-bold text-red-600 bg-gradient-to-r from-red-400 to-yellow-500 bg-clip-text text-transparent">
      SignUp 
    </h1>
        <div className="relative w-24 h-24 mx-auto my-5">
          <img src={data.profilePic||loginIcons} alt="login icon" className="rounded-lg" />
          <label className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 cursor-pointer">
          
            <div className="text-xs bg-slate-200 text-center cursor-pointer rounded-full px-4 py-2">
              Upload Photo
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-700 font-medium mb-2">Full Name:</label>
            <div className="bg-slate-100 p-2 rounded-md">
              <input
                type="text"
                id="fullname"
                placeholder="Enter Your Full Name"
                name="fullname"
                value={data.fullname}
                onChange={handleOnChange}
                required
                className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
            <div className="bg-slate-100 p-2 rounded-md">
              <input
                type="text"
                id="email"
                placeholder="Enter Your Email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password:</label>
            <div className="bg-slate-200 p-2 gap-3 flex rounded-md items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                value={data.password}
                name="password"
                onChange={handleOnChange}
                required
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

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label htmlFor="conformpassword" className="block text-gray-700 font-medium mb-2">Confirm Password:</label>
            <div className="bg-slate-200 p-2 rounded-md flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="conformpassword"
                placeholder="Confirm Password"
                value={data.conformpassword}
                name="conformpassword"
                onChange={handleOnChange}
                required
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

          {/* Sign Up Button */}
          <button
            type="submit"
            className="bg-red-600 text-white py-2 px-6 rounded-full w-full max-w-[150px] mx-auto block hover:scale-105 hover:shadow-md transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
