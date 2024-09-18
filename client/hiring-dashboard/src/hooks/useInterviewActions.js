import { useDispatch } from 'react-redux';
import { updateApplicant, cancelInterview } from "../utils/constants"
import { toast } from 'react-toastify';

export const useInterviewActions = () => {
  const dispatch = useDispatch();

  const changeStatus = async (id, newStatus) => {
    let updateData = { status: newStatus };

    if (newStatus === 'interview_scheduled') {
      const interviewDate = prompt("Enter the interview date (YYYY-MM-DD):");
      if (!interviewDate || isNaN(Date.parse(interviewDate))) {
        toast.error("Invalid interview date.");
        return;
      }
      updateData['interview_date'] = interviewDate;
    } else if (newStatus === 'offer_stage') {
      const offerDate = prompt("Enter the offer letter date (YYYY-MM-DD):");
      if (!offerDate || isNaN(Date.parse(offerDate))) {
        toast.error("Invalid offer letter date.");
        return;
      }
      updateData['offer_letter_date'] = offerDate;
    } else if (newStatus === 'hired') {
      const joiningDate = prompt("Enter the joining date (YYYY-MM-DD):");
      if (!joiningDate || isNaN(Date.parse(joiningDate))) {
        toast.error("Invalid joining date.");
        return;
      }
      updateData['joining_date'] = joiningDate;
    }

    try {
      await dispatch(updateApplicant({ id, data: updateData })).unwrap(); // Ensure the action is dispatched
      toast.success("Applicant status updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update applicant status");
    }
  };

  const cancelInterviewAction = async (id) => {
    if (window.confirm("Are you sure you want to cancel this interview?")) {
      try {
        await dispatch(cancelInterview(id)).unwrap(); // Ensure the action is dispatched
        toast.success("Interview canceled successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to cancel interview");
      }
    }
  };

  return { changeStatus, cancelInterviewAction };
};
