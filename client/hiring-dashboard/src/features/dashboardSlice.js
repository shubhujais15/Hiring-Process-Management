import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePage: 'dashboard',
  applicants: [],
  avgTimeToFill: null,
  isSidebarOpen: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    setAvgTimeToFill: (state, action) => {
      state.avgTimeToFill = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { setActivePage, setApplicants, setAvgTimeToFill, toggleSidebar } = dashboardSlice.actions;

export default dashboardSlice.reducer;
