import { createSlice } from '@reduxjs/toolkit';
import { fetchApplicants } from '../utils/constants';

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

        // Calculate source effectiveness
        const sourceCounts = {};
        const sourceSuccessCounts = {};
        
        applicants.forEach(applicant => {
          const source = applicant.source;
          if (!sourceCounts[source]) sourceCounts[source] = 0;
          if (!sourceSuccessCounts[source]) sourceSuccessCounts[source] = 0;

          sourceCounts[source]++;
          if (applicant.status === 'hired') {
            sourceSuccessCounts[source]++;
          }
        });

        state.sourceEffectivenessData = {
          labels: Object.keys(sourceCounts),
          datasets: [
            {
              label: 'Success Rate (Applications to Hire Ratio)',
              data: Object.keys(sourceCounts).map(
                (source) => (sourceSuccessCounts[source] / sourceCounts[source] * 100) || 0
              ),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };

        // Calculate time to hire trends
        const timeToHire = {};
        applicants.forEach((applicant) => {
          if (applicant.interview_date && applicant.offer_letter_date) {
            const interviewDate = new Date(applicant.interview_date);
            const offerDate = new Date(applicant.offer_letter_date);
            const timeToOffer = (offerDate - interviewDate) / (1000 * 60 * 60 * 24);

            const key = `${interviewDate.getFullYear()}-${String(
              interviewDate.getMonth() + 1
            ).padStart(2, '0')}`;
            if (!timeToHire[key]) timeToHire[key] = [];
            timeToHire[key].push(timeToOffer);
          }
        });

        if (Object.keys(timeToHire).length > 0) {
          state.timeToHireTrendsData = {
            labels: Object.keys(timeToHire),
            datasets: [
              {
                label: 'Average Time to Hire (days)',
                data: Object.keys(timeToHire).map((key) => {
                  const days = timeToHire[key];
                  return days.length ? days.reduce((a, b) => a + b) / days.length : 0;
                }),
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.1,
              },
            ],
          };
        }

        state.loading = false;
      })
      .addCase(fetchApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default performanceSlice.reducer;
