import { useDispatch } from 'react-redux';
import { fetchApplicants } from '../utils/constants'; // Use the fetchApplicants thunk
import { setApplicants, setAvgTimeToFill } from '../features/dashboardSlice'; // Use actions from dashboardSlice
import { useEffect } from 'react';

const useFetchApplicants = () => {
  const dispatch = useDispatch();

  const fetchApplicantsData = async () => {
    try {
      // Dispatch the fetchApplicants thunk
      const resultAction = await dispatch(fetchApplicants());

      if (fetchApplicants.fulfilled.match(resultAction)) {
        const applicantsData = resultAction.payload; // Extract the applicants data
        dispatch(setApplicants(applicantsData)); // Dispatch the setApplicants action
        calculateAvgTimeToFill(applicantsData); // Calculate the average time to fill
      } else {
        console.error('Failed to fetch applicants:', resultAction.error.message);
      }
    } catch (error) {
      console.error('Error fetching applicants data:', error);
    }
  };

  const calculateAvgTimeToFill = (data) => {
    const hiredApplicants = data.filter((applicant) => applicant.status === 'hired');

    if (hiredApplicants.length === 0) {
      dispatch(setAvgTimeToFill(null));
      return;
    }

    const totalDays = hiredApplicants.reduce((acc, applicant) => {
      const applicationDate = new Date(applicant.application_date);
      const offerLetterDate = applicant.offer_letter_date ? new Date(applicant.offer_letter_date) : null;

      if (offerLetterDate) {
        const timeToFill = (offerLetterDate - applicationDate) / (1000 * 60 * 60 * 24); // Convert to days
        return acc + timeToFill;
      }
      return acc;
    }, 0);

    const averageDays = totalDays / hiredApplicants.length;
    dispatch(setAvgTimeToFill(Math.round(averageDays)));
  };

  useEffect(() => {
    fetchApplicantsData(); // Fetch applicants when the hook is used
  }, []);

  return { fetchApplicantsData };
};

export default useFetchApplicants;
