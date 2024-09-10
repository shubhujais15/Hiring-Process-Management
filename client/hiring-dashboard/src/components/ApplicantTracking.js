import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const ApplicantTracking = ({ applicants }) => {
  // Applications by Job
  const getApplicationsByJob = () => {
    const jobPositions = applicants.reduce((acc, applicant) => {
      acc[applicant.position] = (acc[applicant.position] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(jobPositions),
      datasets: [
        {
          label: 'Applications',
          data: Object.values(jobPositions),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };
  };

  // Application Source
  const getApplicationSourceData = () => {
    const sources = applicants.reduce((acc, applicant) => {
      acc[applicant.source] = (acc[applicant.source] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(sources),
      datasets: [
        {
          data: Object.values(sources),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  };

  // Application Status
  const getApplicationStatusData = () => {
    const statuses = applicants.reduce((acc, applicant) => {
      acc[applicant.status] = (acc[applicant.status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(statuses).map(status => {
        switch (status) {
          case 'in_review':
            return 'In Review';
          case 'interview_scheduled':
            return 'Interview Scheduled';
          case 'hired':
            return 'Hired';
          default:
            return status;
        }
      }),
      datasets: [
        {
          label: 'Applicants',
          data: Object.values(statuses),
          backgroundColor: ['#FF9F40', '#4BC0C0', '#FF6384'],
        },
      ],
    };
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Applicant Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Applications by Job */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Applications by Job</h2>
          <Bar data={getApplicationsByJob()} />
        </div>

        {/* Application Source */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Application Source</h2>
          <Pie data={getApplicationSourceData()} />
        </div>

        {/* Application Status */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Application Status</h2>
          <Bar data={getApplicationStatusData()} />
        </div>
      </div>

      {/* Applicant List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Applicant List</h2>
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
