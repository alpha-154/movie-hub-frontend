import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Copyright, 
  Film,
  Star,
  Clapperboard,
  Info ,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 border-t border-gray-200 dark:border-gray-600 shadow-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <div className="flex items-center mb-4">
            <Film className="h-8 w-8 mr-2 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">MovieHub</h3>
          </div>
          <p className="text-gray-600 text-sm dark:text-white">
            Your ultimate destination for movie lovers. Discover, track, and enjoy your favorite films.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 flex items-center transition-colors duration-300 hover:translate-x-1"
              >
                <Clapperboard className="h-4 w-4 mr-2 dark:text-blue-600" />
                <span className='dark:text-white'>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/movies" 
                className="text-gray-700 hover:text-blue-600 flex items-center transition-colors duration-300 hover:translate-x-1"
              >
                <Star className="h-4 w-4 mr-2 dark:text-blue-600" />
                <span className='dark:text-white'>All Movies</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/movies/add" 
                className="text-gray-700 hover:text-blue-600 flex items-center transition-colors duration-300 hover:translate-x-1"
              >
                <Film className="h-4 w-4 mr-2 dark:text-blue-600" />
                <span className='dark:text-white'>Add Movie</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/favorites" 
                className="text-gray-700 hover:text-blue-600 flex items-center transition-colors duration-300 hover:translate-x-1"
              >
                <Star className="h-4 w-4 mr-2 dark:text-blue-600" />
                <span className='dark:text-white'>My Favorites</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-blue-600 flex items-center transition-colors duration-300 hover:translate-x-1"
              >
                <Info className="h-4 w-4 mr-2 dark:text-blue-600" />
                <span className='dark:text-white'>About Us</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-blue-600 flex items-center transition-colors duration-300 hover:translate-x-1"
              >
                <Mail className="h-4 w-4 mr-2 dark:text-blue-600" />
                <span className='dark:text-white'>Contact</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/privacy" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1"
              >
                  <span className='dark:text-white'>Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/terms" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300 hover:translate-x-1"
              >
                  <span className='dark:text-white'>Terms of Service</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900">Connect With Us</h4>
          <div className="flex space-x-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:text-blue-600 transition-colors duration-300 hover:scale-110"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-500 transition-colors duration-300 hover:scale-110"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-pink-500 hover:text-pink-600 transition-colors duration-300 hover:scale-110"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-gray-700 transition-colors duration-300 hover:scale-110"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Newsletter Signup
            <div className="flex mt-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="border border-gray-300 text-gray-800 px-2 py-1 rounded-l w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-r transition-colors duration-300">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 mt-8 pt-6 text-center">
        <p className="flex items-center justify-center text-gray-600">
          <Copyright className="h-4 w-4 mr-2" />
          {currentYear} MovieHub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;