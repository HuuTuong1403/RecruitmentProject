import { createSlice } from "@reduxjs/toolkit";
import {
  fetchJobDeletedAsync,
  fetchJobDetailOfEmployerAsync,
  fetchJobsOfEmployerAsync,
  getDetailEmployerAsync,
  fetchAllApplicationAsync,
} from "features/Employers/slices/thunks";

const initialState = {
  employerDetail: null,
  postJobData: null,
  jobsOfEmployer: [],
  jobDetailEmployer: null,
  jobSlug: null,
  avatar: null,
  jobTrash: [],
  jobApplication: [],
  status: false,
  statusJobDetail: false,
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
    deleteJobPost: (state, action) => {
      const id = action.payload;
      state.jobsOfEmployer = state.jobsOfEmployer.filter(
        (job) => job._id !== id
      );
    },
    deleteJobTrash: (state, action) => {
      const id = action.payload;
      state.jobTrash = state.jobTrash.filter((job) => job._id !== id);
    },
  },
  extraReducers: {
    [getDetailEmployerAsync.pending]: (state) => {
      state.status = true;
    },
    [getDetailEmployerAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.employerDetail = action.payload;
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
      state.jobsOfEmployer = action.payload;
    },
    [fetchJobsOfEmployerAsync.rejected]: (state) => {
      state.status = false;
      state.jobsOfEmployer = [];
    },
    [fetchJobDetailOfEmployerAsync.pending]: (state) => {
      state.statusJobDetail = true;
    },
    [fetchJobDetailOfEmployerAsync.fulfilled]: (state, action) => {
      state.statusJobDetail = false;
      state.jobDetailEmployer = action.payload;
    },
    [fetchJobDetailOfEmployerAsync.rejected]: (state) => {
      state.statusJobDetail = false;
      state.jobDetailEmployer = null;
    },
    [fetchJobDeletedAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchJobDeletedAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.jobTrash = action.payload;
    },
    [fetchJobDeletedAsync.rejected]: (state) => {
      state.status = false;
      state.jobTrash = [];
    },
    [fetchAllApplicationAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchAllApplicationAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.jobApplication = action.payload;
    },
    [fetchAllApplicationAsync.rejected]: (state) => {
      state.status = false;
      state.jobApplication = [];
    },
  },
});

export const {
  addDataPostJob,
  resetDataPostJob,
  handChangeJobSlug,
  deleteJobPost,
  deleteJobTrash,
} = employerSlice.actions;
export default employerSlice.reducer;
