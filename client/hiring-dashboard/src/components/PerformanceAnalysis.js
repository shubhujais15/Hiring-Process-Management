import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import usePerformanceData from '../hooks/usePerformanceData';

const PerformanceAnalysis = () => {
  const { sourceEffectivenessData, timeToHireTrendsData, loading, error } = usePerformanceData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Performance Analysis</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Source Effectiveness */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Source Effectiveness</h2>
          {sourceEffectivenessData ? (
            <Bar data={sourceEffectivenessData} />
          ) : (
            <p>No data available for Source Effectiveness.</p>
          )}
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
