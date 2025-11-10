import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, onThemeToggle, isDark }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar onThemeToggle={onThemeToggle} isDark={isDark} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
