import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TimeToHire = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/applicants/');
        if (!response.ok) throw new Error('Failed to fetch applicants');
        const data = await response.json();
        const updatedData = data.map(calculateApplicantTimes);
        setApplicants(updatedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const calculateApplicantTimes = (applicant) => {
    const time_to_interview = applicant.interview_date
      ? (new Date(applicant.interview_date) - new Date(applicant.application_date)) / (1000 * 60 * 60 * 24)
      : null;

    const time_to_offer = applicant.offer_letter_date && applicant.interview_date
      ? (new Date(applicant.offer_letter_date) - new Date(applicant.interview_date)) / (1000 * 60 * 60 * 24)
      : null;

    const time_to_joining = applicant.joining_date && applicant.offer_letter_date
      ? (new Date(applicant.joining_date) - new Date(applicant.offer_letter_date)) / (1000 * 60 * 60 * 24)
      : null;

    return { ...applicant, time_to_interview, time_to_offer, time_to_joining };
  };

  const getAvgTimeToHire = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const timeToHireByMonth = applicants.reduce((acc, applicant) => {
      if (applicant.status === 'hired' && applicant.time_to_interview) {
        const applicationDate = new Date(applicant.application_date);
        const month = applicationDate.toLocaleString('default', { month: 'long' });
        const timeToHire = applicant.time_to_interview;

        acc[month] = acc[month] || [];
        acc[month].push(timeToHire);
      }
      return acc;
    }, {});

    const labels = months;
    const data = labels.map(
      month => timeToHireByMonth[month]
        ? timeToHireByMonth[month].reduce((sum, days) => sum + days, 0) / timeToHireByMonth[month].length
        : 0
    );

    return {
      labels,
      datasets: [
        {
          label: 'Average Time to Hire (days)',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: false,
        },
      ],
    };
  };

  const getTimePerStage = () => {
    const stages = {
      time_to_interview: 0,
      time_to_offer: 0,
      time_to_joining: 0,
    };

    let hiredCount = 0;

    applicants.forEach(applicant => {
      if (applicant.status === 'hired') {
        if (applicant.time_to_interview) {
          stages.time_to_interview += applicant.time_to_interview;
        }
        if (applicant.time_to_offer) {
          stages.time_to_offer += applicant.time_to_offer;
        }
        if (applicant.time_to_joining) {
          stages.time_to_joining += applicant.time_to_joining;
        }
        hiredCount++;
      }
    });

    if (hiredCount > 0) {
      stages.time_to_interview /= hiredCount;
      stages.time_to_offer /= hiredCount;
      stages.time_to_joining /= hiredCount;
    }

    return {
      labels: ['Time to Interview', 'Time to Offer', 'Time to Joining'],
      datasets: [
        {
          label: 'Average Days',
          data: [
            stages.time_to_interview,
            stages.time_to_offer,
            stages.time_to_joining,
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Average Time to Hire */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Average Time to Hire</h2>
          {applicants.length > 0 ? <Line data={getAvgTimeToHire()} /> : <p>No data available</p>}
        </div>

        {/* Time per Stage */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Time per Stage</h2>
          {applicants.length > 0 ? <Bar data={getTimePerStage()} /> : <p>No data available</p>}
        </div>
      </div>

      {/* Applicants Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Applicant List</h2>
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Position</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Application Date</th>
              <th className="border px-4 py-2">Interview Date</th>
              <th className="border px-4 py-2">Offer Letter Date</th>
              <th className="border px-4 py-2">Joining Date</th>
              <th className="border px-4 py-2">Source</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="text-center">
                <td className="border px-4 py-2">{applicant.name}</td>
                <td className="border px-4 py-2">{applicant.position}</td>
                <td className="border px-4 py-2">{applicant.status}</td>
                <td className="border px-4 py-2">{applicant.application_date}</td>
                <td className="border px-4 py-2">{applicant.interview_date || 'N/A'}</td>
                <td className="border px-4 py-2">{applicant.offer_letter_date || 'N/A'}</td>
                <td className="border px-4 py-2">{applicant.joining_date || 'N/A'}</td>
                <td className="border px-4 py-2">{applicant.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeToHire;
