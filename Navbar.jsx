import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Navbar = ({ onThemeToggle, isDark }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
              TaskMaster
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Tasks
            </Link>
            <Link to="/users" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Users
            </Link>
            <Button 
              variant="secondary" 
              onClick={onThemeToggle}
              className="p-2"
            >
              {isDark ? '☀️' : '🌙'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
