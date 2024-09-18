import { createSlice } from '@reduxjs/toolkit';
import { fetchApplicants, updateApplicant, cancelInterview } from '../utils/constants';

// Slice
const interviewSlice = createSlice({
  name: 'interviews',
  initialState: {
    applicants: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch applicants
    builder.addCase(fetchApplicants.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchApplicants.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.applicants = action.payload;
    });
    builder.addCase(fetchApplicants.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Update applicant
    builder.addCase(updateApplicant.fulfilled, (state, action) => {
      const updatedApplicant = action.payload;
      const index = state.applicants.findIndex(applicant => applicant.id === updatedApplicant.id);
      if (index !== -1) {
        state.applicants[index] = updatedApplicant;
      }
    });
    builder.addCase(updateApplicant.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // Cancel interview
    builder.addCase(cancelInterview.fulfilled, (state, action) => {
      const id = action.payload;
      state.applicants = state.applicants.filter(applicant => applicant.id !== id);
    });
    builder.addCase(cancelInterview.rejected, (state, action) => {
      state.error = action.error.message;
    });
  }
});

export default interviewSlice.reducer;
