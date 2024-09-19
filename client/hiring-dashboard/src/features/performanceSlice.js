// performanceSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchApplicants } from '../utils/constants';
import { calculateSourceEffectiveness, calculateTimeToHireTrends } from '../utils/performanceUtils';

const performanceSlice = createSlice({
  name: 'performance',
  initialState: {
    sourceEffectivenessData: null,
    timeToHireTrendsData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        const applicants = action.payload;

        // Calculate Source Effectiveness and Time to Hire Trends
        state.sourceEffectivenessData = calculateSourceEffectiveness(applicants);
        state.timeToHireTrendsData = calculateTimeToHireTrends(applicants);

        state.loading = false;
      })
      .addCase(fetchApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default performanceSlice.reducer;
