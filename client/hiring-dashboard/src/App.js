import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import store from './store';  // Import your Redux store
import Dashboard from './components/Dashboard';
import ApplicantTracking from './components/ApplicantTracking';
import TimeToHire from './components/TimeToHire';
import InterviewManagement from './components/InterviewManagement';
import PerformanceAnalysis from './components/PerformanceAnalysis';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Provider store={store}>  {/* Wrap the entire App with Provider */}
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar isLoggedIn={isLoggedIn} onLogout={isLoggedIn ? handleLogout : null} />

          <main className="flex-1 p-4">
            <Routes>
              {!isLoggedIn ? (
                <>
                  <Route path="/" element={<Login onLogin={handleLogin} />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/applicant-tracking" element={<ApplicantTracking />} />
                  <Route path="/time-to-hire" element={<TimeToHire />} />
                  <Route path="/interview-management" element={<InterviewManagement />} />
                  <Route path="/performance-analysis" element={<PerformanceAnalysis />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
