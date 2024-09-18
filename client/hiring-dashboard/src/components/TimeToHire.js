import React, { useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import useTimeToHire from '../hooks/useTimeToHire';

const TimeToHire = () => {
  const { applicants, loading, error } = useTimeToHire();

  const getAvgTimeToHire = useMemo(() => {
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
  }, [applicants]);

  const getTimePerStage = useMemo(() => {
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
  }, [applicants]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 bg-gray-100 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Average Time to Hire */}
        <div className="bg-white p-4 rounded shadow w-full">
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Average Time to Hire</h2>
          {applicants.length > 0 ? (
            <div className="w-full">
              <Line data={getAvgTimeToHire} options={{ maintainAspectRatio: false }} />
            </div>
          ) : (
            <p className="text-center">No data available</p>
          )}
        </div>

        {/* Time per Stage */}
        <div className="bg-white p-4 rounded shadow w-full">
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Time per Stage</h2>
          {applicants.length > 0 ? (
            <div className="w-full">
              <Bar data={getTimePerStage} options={{ maintainAspectRatio: false }} />
            </div>
          ) : (
            <p className="text-center">No data available</p>
          )}
        </div>
      </div>

      {/* Applicants Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto w-full">
        <h2 className="text-lg font-bold mb-4 text-center md:text-left">Applicant List</h2>
        <table className="table-auto w-full border text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-2 md:px-4">Name</th>
              <th className="border px-2 py-2 md:px-4">Position</th>
              <th className="border px-2 py-2 md:px-4">Status</th>
              <th className="border px-2 py-2 md:px-4">Application Date</th>
              <th className="border px-2 py-2 md:px-4">Interview Date</th>
              <th className="border px-2 py-2 md:px-4">Offer Letter Date</th>
              <th className="border px-2 py-2 md:px-4">Joining Date</th>
              <th className="border px-2 py-2 md:px-4">Source</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="text-center">
                <td className="border px-2 py-2 md:px-4">{applicant.name}</td>
                <td className="border px-2 py-2 md:px-4">{applicant.position}</td>
                <td className="border px-2 py-2 md:px-4">{applicant.status}</td>
                <td className="border px-2 py-2 md:px-4">{applicant.application_date}</td>
                <td className="border px-2 py-2 md:px-4">{applicant.interview_date || 'N/A'}</td>
                <td className="border px-2 py-2 md:px-4">{applicant.offer_letter_date || 'N/A'}</td>
                <td className="border px-2 py-2 md:px-4">{applicant.joining_date || 'N/A'}</td>
                <td className="border px-2 py-2 md:px-4">{applicant.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeToHire;
