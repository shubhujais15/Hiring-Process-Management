import React from 'react';

const Navbar = ({ isLoggedIn, onLogout, isSidebarOpen }) => {
  return (
    <nav
      className={`bg-blue-300 p-4 flex justify-between items-center transition-all duration-300 mb-4 mx-1 rounded-lg
      w-full fixed top-0 z-10 shadow-md ${isSidebarOpen ? 'lg:pl-64' : ''}`}
    >
      {/* Logo section */}
      <div className="flex items-center">
        <img
          src="https://coloredcow.com/wp-content/themes/ColoredCow/dist/img/logo.png"
          alt="Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Logout button for logged-in users */}
      {isLoggedIn && (
        <button
          onClick={onLogout}
          className="bg-white text-blue-500 py-2 px-4 rounded-md hover:bg-gray-200 transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
