import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/constants'; 

const useTimeToHire = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/`);
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

  return { applicants, loading, error };
};

export default useTimeToHire;
