import { createSlice } from "@reduxjs/toolkit";
import {
  fetchJobDeletedAsync,
  fetchJobDetailOfEmployerAsync,
  fetchJobsOfEmployerAsync,
  getDetailEmployerAsync,
  fetchJobsApplicationNotSavedAsync,
  fetchJobsApplicationSavedAsync,
  fetchJobsApplicationDeletedAsync,
} from "features/Employers/slices/thunks";

const initialState = {
  employerDetail: null,
  postJobData: null,
  jobsOfEmployer: [],
  jobDetailEmployer: null,
  jobSlug: null,
  avatar: null,
  jobTrash: [],
  jobsApplicationNotSaved: [],
  jobsApplicationSaved: [],
  jobsApplicationDeleted: [],
  jobsApplicationSearch: [],
  tabItem: "NotSaved",
  status: false,
  statusJobDetail: false,
};

const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    changeTabsItem: (state, action) => {
      state.tabItem = action.payload;
    },
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
    savedJobApplication: (state, action) => {
      const id = action.payload;
      state.jobsApplicationNotSaved = state.jobsApplicationNotSaved.filter(
        (job) => job._id !== id
      );
    },
    deletedJobAppication: (state, action) => {
      const id = action.payload;
      state.jobsApplicationNotSaved = state.jobsApplicationNotSaved.filter(
        (job) => job._id !== id
      );
    },
    restoredJobApplication: (state, action) => {
      const id = action.payload;
      state.jobsApplicationDeleted = state.jobsApplicationDeleted.filter(
        (job) => job._id !== id
      );
    },
  },
  extraReducers: {
    //Get Detail Employer
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

    //Fetch Job Posting Of Employer
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

    //Fetch Job Detail
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

    //Fetch Job Deleted
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

    //Fetch Jobs Application Not Saved
    [fetchJobsApplicationNotSavedAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchJobsApplicationNotSavedAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.jobsApplicationNotSaved = action.payload;
    },
    [fetchJobsApplicationNotSavedAsync.rejected]: (state) => {
      state.status = false;
      state.jobsApplicationNotSaved = [];
    },

    //Fetch Jobs Application Saved
    [fetchJobsApplicationSavedAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchJobsApplicationSavedAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.jobsApplicationSaved = action.payload;
    },
    [fetchJobsApplicationSavedAsync.rejected]: (state) => {
      state.status = false;
      state.jobsApplicationSaved = [];
    },

    //Fetch Jobs Application Deleted
    [fetchJobsApplicationDeletedAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchJobsApplicationDeletedAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.jobsApplicationDeleted = action.payload;
    },
    [fetchJobsApplicationDeletedAsync.rejected]: (state) => {
      state.status = false;
      state.jobsApplicationDeleted = [];
    },
  },
});

export const {
  addDataPostJob,
  resetDataPostJob,
  handChangeJobSlug,
  deleteJobPost,
  deleteJobTrash,
  savedJobApplication,
  deletedJobAppication,
  changeTabsItem,
  restoredJobApplication,
} = employerSlice.actions;
export default employerSlice.reducer;
