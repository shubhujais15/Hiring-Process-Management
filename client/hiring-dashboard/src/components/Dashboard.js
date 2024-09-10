import React, { useState, useEffect } from 'react';
import ApplicantTracking from './ApplicantTracking';
import TimeToHire from './TimeToHire';
import InterviewManagement from './InterviewManagement';
import PerformanceAnalysis from './PerformanceAnalysis';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [applicants, setApplicants] = useState([]);
  const [avgTimeToFill, setAvgTimeToFill] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mapping of component names for the heading
  const pageTitles = {
    dashboard: 'Hiring Management Dashboard',
    'applicant-tracking': 'Applicant Tracking',
    'time-to-hire': 'Time to Hire',
    'interview-management': 'Interview Management',
    'performance-analysis': 'Performance Analysis',
  };

  useEffect(() => {
    const fetchApplicantsData = async () => {
      try {
        const response = await fetch('http://13.232.38.6:8000/applicants/');
        const data = await response.json();
        setApplicants(data);
        calculateAvgTimeToFill(data);
      } catch (error) {
        console.error('Error fetching applicants data:', error);
      }
    };

    fetchApplicantsData();
  }, []);

  const calculateAvgTimeToFill = (data) => {
    const hiredApplicants = data.filter((applicant) => applicant.status === 'hired');

    if (hiredApplicants.length === 0) {
      setAvgTimeToFill(null);
      return;
    }

    const totalDays = hiredApplicants.reduce((acc, applicant) => {
      const applicationDate = new Date(applicant.application_date);
      const offerLetterDate = applicant.offer_letter_date ? new Date(applicant.offer_letter_date) : null;

      if (offerLetterDate) {
        const timeToFill = (offerLetterDate - applicationDate) / (1000 * 60 * 60 * 24);
        return acc + timeToFill;
      }
      return acc;
    }, 0);

    const averageDays = totalDays / hiredApplicants.length;
    setAvgTimeToFill(Math.round(averageDays));
  };

  const renderContent = () => {
    switch (activePage) {
      case 'applicant-tracking':
        return <ApplicantTracking applicants={applicants} />;
      case 'time-to-hire':
        return <TimeToHire applicants={applicants} />;
      case 'interview-management':
        return <InterviewManagement applicants={applicants} />;
      case 'performance-analysis':
        return <PerformanceAnalysis />;
      default:
        return (
          <div className="flex-1 p-4 sm:p-6 bg-gray-100">
            <h1 className="text-lg sm:text-2xl font-bold mb-4">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg sm:text-xl font-semibold">Total Open Positions</h2>
                <p className="text-2xl sm:text-3xl font-bold mt-2">10</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg sm:text-xl font-semibold">Applications Received</h2>
                <p className="text-2xl sm:text-3xl font-bold mt-2">{applicants.length}</p>
                <span className="text-gray-500">Last week/Month</span>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg sm:text-xl font-semibold">Avg. Time to Fill Vacancies</h2>
                <p className="text-2xl sm:text-3xl font-bold mt-2">
                  {avgTimeToFill !== null ? `${avgTimeToFill} days` : 'No data available'}
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setActivePage={setActivePage} isSidebarOpen={isSidebarOpen} toggleSidebar={setIsSidebarOpen} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} p-4`}>
        
        <div className="bg-gray-900 text-white py-4 px-6 shadow-md">
          <div className="flex items-center">

             {/* Hamburger Icon */}
             <button
              className="text-white bg-gray-800 p-2 focus:outline-none block"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Dynamic Page Title */}
            <h1 className="ml-4 text-2xl">{pageTitles[activePage]}</h1>

           
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
