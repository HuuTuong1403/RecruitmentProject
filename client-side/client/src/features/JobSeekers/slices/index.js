import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllFavoriteJobAsync,
  fetchJobsAsync,
  getDetailJobSeekerAsync,
  fetchAllJobApplicationAsync,
} from "./thunks";

const initialState = {
  status: false,
  jobSeekerProfile: null,
  updateProfileData: null,
  jobs: null,
  favoriteJobs: [],
  applicationJobs: [],
};

export const jobSeekerSlice = createSlice({
  name: "jobSeeker",
  initialState,
  reducers: {
    resetFavoriteJob: (state) => {
      state.favoriteJobs = [];
      state.applicationJobs = [];
    },
    addJobToFavorite: (state, action) => {
      state.favoriteJobs.push(action.payload);
    },
    removeJobOfFavorire: (state, action) => {
      const idJob = action.payload;
      state.favoriteJobs = state.favoriteJobs.filter(
        (item) => item._id !== idJob
      );
    },
  },
  extraReducers: {
    [getDetailJobSeekerAsync.pending]: (state) => {
      state.status = true;
      state.jobSeekerProfile = null;
    },
    [getDetailJobSeekerAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.jobSeekerProfile = action.payload;
    },
    [getDetailJobSeekerAsync.rejected]: (state) => {
      state.status = false;
      state.jobSeekerProfile = null;
    },
    [fetchJobsAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchJobsAsync.fulfilled]: (state, action) => {
      state.jobs = action.payload;
      state.status = false;
    },
    [fetchJobsAsync.rejected]: (state) => {
      state.status = false;
      state.jobs = [];
    },
    [fetchAllFavoriteJobAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchAllFavoriteJobAsync.fulfilled]: (state, action) => {
      state.favoriteJobs = action.payload;
      state.status = false;
    },
    [fetchAllFavoriteJobAsync.rejected]: (state) => {
      state.status = false;
      state.favoriteJobs = [];
    },
    [fetchAllJobApplicationAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchAllJobApplicationAsync.fulfilled]: (state, action) => {
      state.applicationJobs = action.payload;
      state.status = false;
    },
    [fetchAllJobApplicationAsync.rejected]: (state) => {
      state.status = false;
      state.applicationJobs = [];
    },
  },
});
export const { addJobToFavorite, removeJobOfFavorire, resetFavoriteJob } =
  jobSeekerSlice.actions;
export default jobSeekerSlice.reducer;
