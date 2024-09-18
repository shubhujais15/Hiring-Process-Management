import { createAsyncThunk } from '@reduxjs/toolkit';
export const API_BASE_URL = "http://127.0.0.1:8000/applicants";

// Async Thunks for API calls

// Fetch Applicants
export const fetchApplicants = createAsyncThunk('interviews/fetchApplicants', async () => {
  const response = await fetch(`${API_BASE_URL}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch applicants");
  }
  const data = await response.json();
  return data;
});

// Update Applicant
export const updateApplicant = createAsyncThunk('interviews/updateApplicant', async ({ id, data }) => {
  const response = await fetch(`${API_BASE_URL}/${id}/`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update applicant");
  }
  return await response.json();
});

// Cancel Interview
export const cancelInterview = createAsyncThunk('interviews/cancelInterview', async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}/`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error("Failed to cancel interview");
  }
  return id; // Return the applicant ID to remove from the list
});
