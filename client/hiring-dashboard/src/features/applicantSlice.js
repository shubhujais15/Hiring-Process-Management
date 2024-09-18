import { createSlice } from '@reduxjs/toolkit';
import { fetchApplicants } from '../utils/constants'; 

const initialState = {
  applicants: [],
  loading: false,
  error: null,
};

const applicantSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        state.applicants = action.payload;
        state.loading = false;
      })
      .addCase(fetchApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default applicantSlice.reducer;
