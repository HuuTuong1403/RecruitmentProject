import { createSlice } from "@reduxjs/toolkit";
import {
  getDetailEmployerAsync,
  fetchJobsOfEmployerAsync,
  fetchJobDetailOfEmployerAsync,
} from "features/Employers/slices/thunks";

const initialState = {
  employerDetail: null,
  postJobData: null,
  jobsOfEmployer: null,
  jobDetailEmployer: null,
  jobSlug: null,
  avatar: null,
  status: false,
  statusJobDetail: false
};

const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    addDataPostJob: (state, action) => {
      state.postJobData = { ...state.postJobData, ...action.payload };
    },
    resetDataPostJob: (state) => {
      state.postJobData = null;
    },
    handChangeJobSlug: (state, action) => {
      state.jobSlug = action.payload;
    },
  },
  extraReducers: {
    [getDetailEmployerAsync.pending]: (state) => {
      state.status = true;
    },
    [getDetailEmployerAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.employerDetail = action?.payload;
    },
    [getDetailEmployerAsync.rejected]: (state) => {
      state.status = false;
      state.employerDetail = null;
    },
    [fetchJobsOfEmployerAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchJobsOfEmployerAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.jobsOfEmployer = action?.payload;
    },
    [fetchJobsOfEmployerAsync.rejected]: (state) => {
      state.status = false;
      state.jobsOfEmployer = null;
    },
    [fetchJobDetailOfEmployerAsync.pending]: (state) => {
      state.statusJobDetail = true;
    },
    [fetchJobDetailOfEmployerAsync.fulfilled]: (state, action) => {
      state.statusJobDetail = false;
      state.jobDetailEmployer = action?.payload;
    },
    [fetchJobDetailOfEmployerAsync.rejected]: (state) => {
      state.statusJobDetail = false;
      state.jobDetailEmployer = null;
    },
  },
});

export const { addDataPostJob, resetDataPostJob, handChangeJobSlug } =
  employerSlice.actions;
export default employerSlice.reducer;
