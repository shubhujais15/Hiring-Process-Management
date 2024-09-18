const useApplicantData = (applicants = []) => {
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

  return {
    getApplicationsByJob,
    getApplicationSourceData,
    getApplicationStatusData,
  };
};

export default useApplicantData;
