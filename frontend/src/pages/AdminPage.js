import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Outlet } from "react-router-dom";

const AdminPage = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 flex flex-col items-center">
          {/* User Profile Picture or Default Icon */}
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              className="w-24 h-24 rounded-full object-cover mb-4"
              alt={user?.name || 'User Profile'}
            />
          ) : (
            <FaUserCircle className="text-6xl text-gray-500 mb-4" />
          )}
          
          {/* User Name and Role */}
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800 capitalize">
              {user?.fullname || 'Admin Name'}
            </p>
            <p className="text-sm text-gray-600">{user?.role || 'Admin Role'}</p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-8">
          <ul className="text-gray-700">
             
            
            <Link to="products">
              <li className="px-6 py-2 hover:bg-gray-200 cursor-pointer transition-colors duration-300">
                Manage Products
              </li>
         </Link>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;
