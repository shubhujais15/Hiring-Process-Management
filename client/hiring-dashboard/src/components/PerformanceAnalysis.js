import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const PerformanceAnalysis = () => {
  const [sourceEffectivenessData, setSourceEffectivenessData] = useState(null);
  const [timeToHireTrendsData, setTimeToHireTrendsData] = useState(null);

  // Fetch and process data from the API
  useEffect(() => {
    // Fetch applicant data
    fetch('http://127.0.0.1:8000/applicants/')
      .then(response => response.json())
      .then(applicants => {
        // Calculate source effectiveness
        const sourceCounts = {};
        const sourceSuccessCounts = {};
        
        applicants.forEach(applicant => {
          const source = applicant.source;
          if (!sourceCounts[source]) sourceCounts[source] = 0;
          if (!sourceSuccessCounts[source]) sourceSuccessCounts[source] = 0;
          
          sourceCounts[source]++;
          if (applicant.status === 'hired') {
            sourceSuccessCounts[source]++;
          }
        });
        
        const sourceEffectiveness = {
          labels: Object.keys(sourceCounts),
          datasets: [
            {
              label: 'Success Rate (Applications to Hire Ratio)',
              data: Object.keys(sourceCounts).map(source => (sourceSuccessCounts[source] / sourceCounts[source] * 100) || 0),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };
        
        // Calculate time to hire trends
        const timeToHire = {};
        
        applicants.forEach(applicant => {
          if (applicant.interview_date && applicant.offer_letter_date) {
            const interviewDate = new Date(applicant.interview_date);
            const offerDate = new Date(applicant.offer_letter_date);
            const timeToOffer = (offerDate - interviewDate) / (1000 * 60 * 60 * 24); // Convert to days
            
            const key = `${interviewDate.getFullYear()}-${String(interviewDate.getMonth() + 1).padStart(2, '0')}`; // "YYYY-MM" format
            if (!timeToHire[key]) timeToHire[key] = [];
            timeToHire[key].push(timeToOffer);
          }
        });

        // Check if there is valid data to display
        if (Object.keys(timeToHire).length === 0) {
          setTimeToHireTrendsData(null); // No data to show
        } else {
          const timeToHireTrends = {
            labels: Object.keys(timeToHire),
            datasets: [
              {
                label: 'Average Time to Hire (days)',
                data: Object.keys(timeToHire).map(key => {
                  const days = timeToHire[key];
                  return days.length ? days.reduce((a, b) => a + b) / days.length : 0;
                }),
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.1,
              },
            ],
          };
          setTimeToHireTrendsData(timeToHireTrends);
        }

        setSourceEffectivenessData(sourceEffectiveness);
      })
      .catch(error => console.error('Error fetching applicants data:', error));
  }, []);

  if (!sourceEffectivenessData || !timeToHireTrendsData) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched or if there's no data
  }

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Performance Analysis</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Source Effectiveness */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Source Effectiveness</h2>
          <Bar data={sourceEffectivenessData} />
        </div>

        {/* Time to Hire Trends */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Time to Hire Trends</h2>
          {timeToHireTrendsData ? <Line data={timeToHireTrendsData} /> : <p>No data available for Time to Hire Trends.</p>}
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
