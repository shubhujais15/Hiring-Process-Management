import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ApplicantTracking from './components/ApplicantTracking';
import TimeToHire from './components/TimeToHire';
import InterviewManagement from './components/InterviewManagement';
import PerformanceAnalysis from './components/PerformanceAnalysis';
import Login from './components/Login';
import Navbar from './components/Navbar';  // Import Navbar component

function App() {
  // Check if the user is logged in by reading from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // Handle login - update both state and localStorage
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Persist login state
  };

  // Handle logout - update both state and localStorage
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear login state from localStorage
  };

  useEffect(() => {
    // Check if the user is already logged in on mount (e.g., after a page refresh)
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Router>
      <div className="flex flex-col">
        {/* Show the Navbar for all pages */}
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="flex-1 p-4">
          <Routes>
            {/* Route for unauthenticated users */}
            {!isLoggedIn ? (
              <Route path="/" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>
                {/* Authenticated routes */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/applicant-tracking" element={<ApplicantTracking />} />
                <Route path="/time-to-hire" element={<TimeToHire />} />
                <Route path="/interview-management" element={<InterviewManagement />} />
                <Route path="/performance-analysis" element={<PerformanceAnalysis />} />
              </>
            )}
            {/* Redirect any unknown route to the home page */}
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
