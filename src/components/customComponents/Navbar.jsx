import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Film,
  PlusCircle,
  Star,
  User,
  LogOut,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [isMovieDropdownOpen, setIsMovieDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const toggleMovieDropdown = () => {
    setIsMovieDropdownOpen(!isMovieDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase logout

      setIsSidebarOpen(false);
      toast.success("Logout successful!");
      navigate("/"); // Redirect to the home page
    } catch (error) {
      toast.error("Failed to log out: " + error.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Reset dropdowns when sidebar is toggled
    setIsMovieDropdownOpen(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsMovieDropdownOpen(false);
  };

  // Navigation link styles
  const navLinkStyles = ({ isActive }) => `
    flex items-center 
    ${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-800 hover:text-blue-600"
    }
    transition-colors duration-300 
    py-2 px-3 
    rounded-md 
    hover:bg-blue-50"
  `;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="shadow-md px-4 py-3  justify-between items-center dark:border dark:border-gray-800 dark:rounded-lg md:flex hidden">
        {/* Logo */}
       
         <div className="flex items-center">
          <Film className="h-8 w-8 mr-2 text-blue-500" />
          <span className="font-bold text-xl text-gray-900 dark:text-white">
            MovieHub
          </span>
        </div>

        

        {/* Desktop Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* Home Link */}
          <NavLink to="/" className={navLinkStyles}>
            <Home className="h-5 w-5 mr-1 dark:text-blue-600" />
            <span className="dark:text-white">Home</span>
          </NavLink>

          {/* All Movies Link */}
          <NavLink to="/all-movies" className={navLinkStyles}>
            <Film className="h-5 w-5 mr-1 dark:text-blue-600" />
            <span className="dark:text-white">All Movies</span>
          </NavLink>

          {/* Movies Dropdown */}
          <div className="relative">
            <button
              onClick={toggleMovieDropdown}
              className="text-gray-800 hover:text-blue-600 flex items-center py-2 px-3 rounded-md hover:bg-blue-50 transition-colors duration-300"
            >
              <PlusCircle className="h-5 w-5 mr-1 dark:text-blue-600" />
              <span className="dark:text-white">Movies</span>
            </button>

            {isMovieDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <NavLink
                  to="/add-movies"
                  className="px-4 py-2 hover:bg-blue-50 flex items-center bg-white text-gray-800 hover:text-blue-600"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Movie
                </NavLink>
                <NavLink
                  to="/favourite-movies"
                  className="px-4 py-2 hover:bg-blue-50 flex items-center bg-white text-gray-800 hover:text-blue-600"
                >
                  <Star className="h-4 w-4 mr-2" />
                  My Favorites
                </NavLink>
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div className="flex items-center justify-center">
            <Link to="/profile" className="mr-4 flex justify-center items-center gap-2">
              <User className="h-5 w-5 text-gray-900 dark:text-blue-600"/>
              <span className="">  My Profile</span>
            
            </Link>
            {user ? (
              <div className="flex items-center justify-center gap-2">
                <div className="relative group">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                  {/* Username tooltip */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {user.displayName || "User"}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="mr-4">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="shadow-md px-4 py-3 flex justify-between items-center md:hidden dark:border dark:border-gray-600 dark:rounded-lg">
        {/* Logo */}
        
         <div className="flex items-center">
          <Film className="h-8 w-8 mr-2 text-blue-500" />
          <span className="font-bold text-xl text-gray-900 dark:text-white">
            MovieHub
          </span>
        </div>

        

        {/* Hamburger Menu */}
        <button
          onClick={toggleSidebar}
          className="text-gray-800 hover:text-blue-600"
        >
          <Menu className="h-6 w-6 dark:text-blue-600" />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
      <div
        className={`
          fixed top-0 right-0 w-64 h-full bg-white dark:bg-black dark:border dark:border-l-gray-600 dark:rounded-l-lg shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Sidebar Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <Film className="h-6 w-6 mr-2 text-blue-500" />
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              MovieHub
            </span>
          </div>
          <button
            onClick={closeSidebar}
            className="text-gray-800 hover:text-blue-600"
          >
            <X className="h-6 w-6 dark:text-white" />
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <div className="py-4">
          {/* Home Link */}
          <NavLink
            to="/"
            className="px-4 py-2 hover:bg-blue-50 flex items-center text-gray-800 hover:text-blue-600"
            onClick={closeSidebar}
          >
            <Home className="h-5 w-5 mr-2 dark:text-blue-600" />
            <span className="font-bold text-md text-gray-900 dark:text-blue-500">
              MovieHub
            </span>
          </NavLink>

          {/* All Movies Link */}
          <NavLink
            to="/all-movies"
            className="px-4 py-2 hover:bg-blue-50 flex items-center text-gray-800 hover:text-blue-600"
            onClick={closeSidebar}
          >
            <Film className="h-5 w-5 mr-2 dark:text-blue-600" />
            <span className="font-bold text-md text-gray-900 dark:text-blue-500">
              All Movies
            </span>
          </NavLink>

          {/* Movies Dropdown */}
          <div>
            <button
              onClick={toggleMovieDropdown}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center text-gray-800 hover:text-blue-600"
            >
              <PlusCircle className="h-5 w-5 mr-2 dark:text-blue-600" />
              <span className="font-bold text-md text-gray-900 dark:text-blue-500">
                Movies
              </span>
            </button>

            {isMovieDropdownOpen && (
              <div>
                <NavLink
                  to="/add-movies"
                  className="pl-10 pr-4 py-2 hover:bg-blue-50 flex items-center text-gray-800 hover:text-blue-600"
                  onClick={closeSidebar}
                >
                  <PlusCircle className="h-4 w-4 mr-2 dark:text-blue-600" />
                  <span className="font-bold text-md text-gray-900 dark:text-blue-500">
                    Add Movies
                  </span>
                </NavLink>
                <NavLink
                  to="/favourite-movies"
                  className="pl-10 pr-4 py-2 hover:bg-blue-50 flex items-center text-gray-800 hover:text-blue-600"
                  onClick={closeSidebar}
                >
                  <Star className="h-4 w-4 mr-2 dark:text-blue-600" />
                  <span className="font-bold text-md text-gray-900 dark:text-blue-500">
                    My Favorites
                  </span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div className="flex items-center justify-start ml-4">
            <div className="flex flex-col gap-2">
             
                <Link to="/profile" className="mr-4 flex items-center justify-start gap-2">
                  <User className="h-5 w-5 text-gray-900 dark:text-white" />
                  <span className="text-gray-900 dark:text-white font-bold">
                    My Profile
                  </span>
                </Link>
              
              {user ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="relative group">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                    {/* Username tooltip */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {user.displayName || "User"}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="mr-4">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
