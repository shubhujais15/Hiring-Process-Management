import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './features/dashboardSlice';
import performanceReducer from './features/performanceSlice'; // Import performance slice
// import timeToHireReducer from './features/timeToHireSlice'; // Import time to hire slice
import interviewReducer from './features/interviewSlice'; // Import interview management slice
import applicantReducer from './features/applicantSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    performance: performanceReducer, // Add performance reducer
    // timeToHire: timeToHireReducer, // Add time to hire reducer
    interviewManagement: interviewReducer, // Add interview management reducer
    applicant: applicantReducer, 
  },
});


export default store;