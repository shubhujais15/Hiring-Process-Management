import React from 'react';

const Navbar = ({ isLoggedIn, onLogout, isSidebarOpen }) => {
  return (
    <nav className={`bg-blue-300 p-4 flex justify-between items-center rounded-lg ml-2 mt-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <div>
        <img
          src="https://coloredcow.com/wp-content/themes/ColoredCow/dist/img/logo.png"
          alt="Logo"
          className="h-8 w-auto"
        />
      </div>

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
