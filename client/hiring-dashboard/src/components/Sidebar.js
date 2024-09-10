import React from 'react';

const Sidebar = ({ setActivePage, isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-24 left-0 w-64 h-full bg-gray-800 text-white p-4 z-40 transition-transform transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <h2 className="text-xl font-bold mb-6">Hiring Dashboard</h2>
      <nav className="flex flex-col space-y-4">
        <button
          className="hover:bg-gray-700 p-2 rounded text-left"
          onClick={() => {
            setActivePage('dashboard');
            toggleSidebar(false); // Close sidebar after selection
          }}
        >
          Dashboard Overview
        </button>
        <button
          className="hover:bg-gray-700 p-2 rounded text-left"
          onClick={() => {
            setActivePage('applicant-tracking');
            toggleSidebar(false);
          }}
        >
          Applicant Tracking
        </button>
        <button
          className="hover:bg-gray-700 p-2 rounded text-left"
          onClick={() => {
            setActivePage('time-to-hire');
            toggleSidebar(false);
          }}
        >
          Time to Hire
        </button>
        <button
          className="hover:bg-gray-700 p-2 rounded text-left"
          onClick={() => {
            setActivePage('interview-management');
            toggleSidebar(false);
          }}
        >
          Interview Management
        </button>
        <button
          className="hover:bg-gray-700 p-2 rounded text-left"
          onClick={() => {
            setActivePage('performance-analysis');
            toggleSidebar(false);
          }}
        >
          Performance Analysis
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
