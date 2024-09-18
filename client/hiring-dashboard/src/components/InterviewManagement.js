import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApplicants } from '../utils/constants'; 
import { useInterviewActions } from '../hooks/useInterviewActions';
import { toast } from 'react-toastify';

const localizer = momentLocalizer(moment);

const formatDate = (date) => moment(date).format('YYYY-MM-DD');

const InterviewManagement = () => {
  const dispatch = useDispatch();
  
  // Access state using the correct key
  const interviewState = useSelector((state) => state.interviewManagement || {});
  const { applicants = [], status = 'idle', error = null } = interviewState;
  
  const { changeStatus, cancelInterviewAction } = useInterviewActions();

  useEffect(() => {
    dispatch(fetchApplicants());
  }, [dispatch]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await changeStatus(id, newStatus);
      dispatch(fetchApplicants()); // Refetch applicants to get updated data
    } catch (error) {
      console.error(error);
      toast.error("Failed to update applicant status");
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const events = applicants.map(applicant => ({
    id: applicant.id,
    title: `Interview with ${applicant.name} for ${applicant.position}`,
    start: new Date(applicant.interview_date),
    end: new Date(new Date(applicant.interview_date).getTime() + 60 * 60 * 1000), // 1 hour duration
  }));

  return (
    <div className="p-4 sm:p-6 bg-gray-100 w-full">
      <h1 className="text-2xl font-bold mb-4">Interview Management</h1>

      <div className="mb-6 bg-white p-4 rounded shadow w-full overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Calendar View</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={['month', 'week', 'day']}
          defaultView="month"
          popup={true}
          className="w-full"
        />
      </div>

      <div className="bg-white p-4 rounded shadow w-full overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Interview List</h2>
        <table className="table-auto w-full text-xs md:text-sm lg:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-2 md:px-4">Candidate</th>
              <th className="py-2 px-2 md:px-4">Position</th>
              <th className="py-2 px-2 md:px-4">Application Date</th>
              <th className="py-2 px-2 md:px-4">Interview Date</th>
              <th className="py-2 px-2 md:px-4">Status</th>
              <th className="py-2 px-2 md:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map(applicant => (
              <tr key={applicant.id} className="text-center">
                <td className="py-2 px-2 md:px-4 border-b">{applicant.name}</td>
                <td className="py-2 px-2 md:px-4 border-b">{applicant.position}</td>
                <td className="py-2 px-2 md:px-4 border-b">{formatDate(applicant.application_date)}</td>
                <td className="py-2 px-2 md:px-4 border-b">{applicant.interview_date ? formatDate(applicant.interview_date) : 'N/A'}</td>
                <td className="py-2 px-2 md:px-4 border-b">
                  <select
                    value={applicant.status}
                    onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="in_review">In Review</option>
                    <option value="interview_scheduled">Interview Scheduled</option>
                    <option value="offer_stage">Offer Stage</option>
                    <option value="hired">Hired</option>
                  </select>
                </td>
                <td className="py-2 px-2 md:px-4 border-b">
                  <button
                    onClick={() => handleStatusChange(applicant.id, 'interview_scheduled')}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => cancelInterviewAction(applicant.id)}
                    className="text-red-500 hover:underline"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewManagement;
