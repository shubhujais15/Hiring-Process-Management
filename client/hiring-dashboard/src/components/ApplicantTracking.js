import React, { useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import useApplicantData from '../hooks/useApplicantData';
import { fetchApplicants } from '../utils/constants'; 

const ApplicantTracking = () => {
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.applicant.applicants);
  const { getApplicationsByJob, getApplicationSourceData, getApplicationStatusData } = useApplicantData(applicants);

  useEffect(() => {
    // Fetch applicants on component mount
    dispatch(fetchApplicants());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Applicant Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Applications by Job */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Applications by Job</h2>
          <Bar data={getApplicationsByJob()} />
        </div>

        {/* Application Source */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Application Source</h2>
          <Pie data={getApplicationSourceData()} />
        </div>

        {/* Application Status */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Application Status</h2>
          <Bar data={getApplicationStatusData()} />
        </div>
      </div>

      {/* Applicant List */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Applicant List</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Name</th>
              <th className="py-2 px-4 bg-gray-200">Position</th>
              <th className="py-2 px-4 bg-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b">{applicant.name}</td>
                <td className="py-2 px-4 border-b">{applicant.position}</td>
                <td className="py-2 px-4 border-b">{applicant.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantTracking;
