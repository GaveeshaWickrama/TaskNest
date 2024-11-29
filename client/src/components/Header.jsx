import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/auth";
import logo from "../assets/icons/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUser, FaSignOutAlt } from 'react-icons/fa';
import defaultProfilePic from '../assets/icons/profile.png'

const Header = ({ toggleNavbar }) => {
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  if (loading) {
    return <div><span className="loading loading-spinner text-info">Loading...</span></div>; // Show a loading spinner or message
  }

  const handleLogout = async () => {
    setDropdownOpen(false); // Close the dropdown
    await logout();
    navigate("/auth/login"); // Redirect to the home page after logout
  };

  return (
    <div className="header bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 p-4 flex justify-between items-center fixed top-0 left-0 w-full h-20 shadow-lg z-50">
      <div className="flex items-center">
        <button
          onClick={toggleNavbar}
          className="bg-blue-500 text-white rounded-full p-2 flex items-center justify-center shadow-md hover:bg-blue-600 transition duration-200"
        >
          <FaBars size={24} />
        </button>
        <div className="flex items-center p-0 rounded ml-4">
          <img src={logo} alt="Staymate Logo" className="h-12" />
        </div>
        <div className="ml-4 text-white">
          <h1 className="text-2xl font-bold">TASTNEST</h1>
          <p className="text-sm">Create Youtr Own TaskLsit</p>
        </div>
    </div>
    {currentUser ? (
        <div className="relative flex items-center" ref={dropdownRef}>
          <div className="flex items-center cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>         
            <div className="text-right mr-4">
              <p className="text-lg font-bold text-white">
                {currentUser.firstName} {currentUser.lastName}
              </p>
            </div>

            <img
              src={defaultProfilePic}
              alt="Profile"
              className="h-12 w-12 rounded-full border-2 border-white"
            />
          </div>
          {dropdownOpen && (
            <div className="absolute top-12 right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
              <Link
                to={`/users/ViewProfile/${currentUser.id}`}
                className="px-4 py-4 text-gray-800 hover:bg-gray-100 rounded-t-md flex items-center"
              >
                <FaUser className="text-blue-500 mr-2" />
                View Profile
              </Link>
              <hr className="border-gray-300" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-4 text-gray-800 hover:bg-gray-100 rounded-b-md flex items-center"
              >
                <FaSignOutAlt className="text-blue-500 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
          <Link to="/signup" className="text-white hover:underline">
            Signup
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
