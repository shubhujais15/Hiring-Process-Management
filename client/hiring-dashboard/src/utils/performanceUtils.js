// utils/performanceUtils.js

// Function to calculate Source Effectiveness
// utils/performanceUtils.js

export const calculateSourceEffectiveness = (applicants) => {
    const sourceCounts = {};  // Total applicants per source
    const sourceSuccessCounts = {};  // Hired applicants per source
  
    applicants.forEach((applicant) => {
      const source = applicant.source || 'Unknown';  // Default to 'Unknown' if no source
  
      // Initialize counters for each source if they don't exist yet
      if (!sourceCounts[source]) {
        sourceCounts[source] = 0;
        sourceSuccessCounts[source] = 0;
      }
  
      // Count total applicants for this source
      sourceCounts[source]++;
  
      // Count successful hires for this source (status === 'hired')
      if (applicant.status === 'hired') {
        sourceSuccessCounts[source]++;
      }
    });
  
    console.log('Source Counts:', sourceCounts);
    console.log('Source Success Counts:', sourceSuccessCounts);
  
    // Prepare the data for the chart
    return {
      labels: Object.keys(sourceCounts),
      datasets: [
        {
          label: 'Success Rate (Applications to Hire Ratio)',
          data: Object.keys(sourceCounts).map((source) => {
            const successRate = (sourceSuccessCounts[source] / sourceCounts[source]) * 100;
  
            // Additional console check for debugging
            console.log(`Source: ${source}, Success Count: ${sourceSuccessCounts[source]}, Total Count: ${sourceCounts[source]}, Success Rate: ${successRate}`);
  
            return successRate || 0; // Default to 0 in case of division by 0
          }),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };
  
  
  // Function to calculate Time to Hire Trends
  export const calculateTimeToHireTrends = (applicants) => {
    const timeToHire = {};
  
    applicants.forEach((applicant) => {
      if (applicant.interview_date && applicant.offer_letter_date) {
        const interviewDate = new Date(applicant.interview_date);
        const offerDate = new Date(applicant.offer_letter_date);
        const timeToOffer = (offerDate - interviewDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  
        const key = `${interviewDate.getFullYear()}-${String(interviewDate.getMonth() + 1).padStart(2, '0')}`;
        if (!timeToHire[key]) timeToHire[key] = [];
        timeToHire[key].push(timeToOffer);
      }
    });
  
    return {
      labels: Object.keys(timeToHire),
      datasets: [
        {
          label: 'Average Time to Hire (days)',
          data: Object.keys(timeToHire).map((key) => {
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
  };
  