import { createSlice } from "@reduxjs/toolkit";
import { fetchJobsAsync, getDetailJobSeekerAsync } from "./thunks";

const initialState = {
  status: false,
  jobSeekerProfile: null,
  updateProfileData: null,
  jobs: [],
};

export const jobSeekerSlice = createSlice({
  name: "jobSeeker",
  initialState,
  reducers: {},
  extraReducers: {
    [getDetailJobSeekerAsync.pending]: (state) => {
      state.status = true;
      state.jobSeekerProfile = null;
    },
    [getDetailJobSeekerAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.jobSeekerProfile = action?.payload;
    },
    [getDetailJobSeekerAsync.rejected]: (state) => {
      state.status = false;
      state.jobSeekerProfile = null;
    },
    [fetchJobsAsync.pending]: (state) => {
      state.jobs = [];
      state.status = true;
    },
    [fetchJobsAsync.fulfilled]: (state, action) => {
      state.jobs = action?.payload;
      state.status = false;
    },
    [fetchJobsAsync.rejected]: (state) => {
      state.status = false;
    },
  },
});

export default jobSeekerSlice.reducer;
