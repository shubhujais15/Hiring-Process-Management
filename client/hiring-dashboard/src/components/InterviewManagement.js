import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const API_BASE_URL = "http://127.0.0.1:8000/applicants";

// API functions
const updateApplicant = async (id, data) => {
  console.log(data);
  const response = await fetch(`${API_BASE_URL}/${id}/`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update applicant");
  return response.json();
};

const cancelInterviewAPI = async (id) => {
  console.log("before fetching API");
  const response = await fetch(`${API_BASE_URL}/${id}/`, { 
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    }
  });
  console.log("after fetching API");
  if (!response.ok) throw new Error("Failed to cancel interview");
};


const InterviewManagement = ({ applicants }) => {
  const [events, setEvents] = useState([]);
  const [applicantStatus, setApplicantStatus] = useState({});

  useEffect(() => {
    const transformedEvents = applicants.map(applicant => ({
      id: applicant.id,
      title: `Interview with ${applicant.name} for ${applicant.position}`,
      start: new Date(applicant.interview_date),
      end: new Date(new Date(applicant.interview_date).getTime() + 60 * 60 * 1000),
      candidate: applicant.name,
      position: applicant.position,
      status: applicant.status,
      source: applicant.source,
    }));
    setEvents(transformedEvents);

    const statusMap = applicants.reduce((acc, applicant) => {
      acc[applicant.id] = applicant.status;
      return acc;
    }, {});
    setApplicantStatus(statusMap);
  }, [applicants]);

  const changeStatus = async (id, newStatus) => {
    let updateData = { status: newStatus };

    if (newStatus === 'interview_scheduled') {
      const interviewDate = prompt("Enter the interview date (YYYY-MM-DD):");
      if (interviewDate) {
        updateData['interview_date'] = interviewDate;
      }
    } else if (newStatus === 'offer_stage') {
      const offerDate = prompt("Enter the offer letter date (YYYY-MM-DD):");
      if (offerDate) {
        updateData['offer_letter_date'] = offerDate;
      }
    } else if (newStatus === 'hired') {
      const joiningDate = prompt("Enter the joining date (YYYY-MM-DD):");
      if (joiningDate) {
        updateData['joining_date'] = joiningDate;
      }
    }

    try {
      await updateApplicant(id, updateData);
      setApplicantStatus(prevStatus => ({
        ...prevStatus,
        [id]: newStatus
      }));
      alert("Applicant status updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update applicant status");
    }
  };

  const cancelInterview = async (id) => {
    if (window.confirm("Are you sure you want to cancel this interview?")) {
      try {
        await cancelInterviewAPI(id);
        console.log("after cacel API");
        setEvents(events.filter(event => event.id !== id));
        alert("Interview canceled successfully!");
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert("Failed to cancel interview");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Interview Management</h1>

      {/* Calendar View */}
      <div className="mb-6 bg-white p-4 rounded shadow">
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
        />
      </div>

      {/* Interview List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Interview List</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Candidate</th>
              <th className="py-2 px-4 bg-gray-200">Position</th>
              <th className="py-2 px-4 bg-gray-200">Application Date</th>
              <th className="py-2 px-4 bg-gray-200">Interview Date</th>
              <th className="py-2 px-4 bg-gray-200">Status</th>
              <th className="py-2 px-4 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="text-center">
                <td className="py-2 px-4 border-b">{applicant.name}</td>
                <td className="py-2 px-4 border-b">{applicant.position}</td>
                <td className="py-2 px-4 border-b">{new Date(applicant.application_date).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{applicant.interview_date ? new Date(applicant.interview_date).toLocaleString() : 'N/A'}</td>
                <td className="py-2 px-4 border-b">
                  <select
                    value={applicantStatus[applicant.id] || applicant.status}
                    onChange={(e) => changeStatus(applicant.id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="in_review">In Review</option>
                    <option value="interview_scheduled">Interview Scheduled</option>
                    <option value="offer_stage">Offer Stage</option>
                    <option value="hired">Hired</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => changeStatus(applicant.id, 'interview_scheduled')}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => cancelInterview(applicant.id)}
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
