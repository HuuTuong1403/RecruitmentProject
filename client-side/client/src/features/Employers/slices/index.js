import { createSlice } from "@reduxjs/toolkit";
import {
  countApplicationStatusAsync,
  fetchAllEventOfEmployerAsync,
  fetchEventDetailAsync,
  fetchJobDeletedAsync,
  fetchJobDetailOfEmployerAsync,
  fetchJobsApplicationDeletedAsync,
  fetchJobsApplicationNotSavedAsync,
  fetchJobsApplicationSavedAsync,
  fetchJobsOfEmployerAsync,
  fetchParticipantsByIdEventAsync,
  getDetailEmployerAsync,
  fetchAllEventDeletedAsync,
} from "features/Employers/slices/thunks";

const initialState = {
  applicationCount: null,
  avatar: null,
  dataFilter: null,
  employerDetail: null,
  eventDetailEmployer: null,
  eventsOfEmployer: [],
  eventsDeleted: [],
  jobDetailEmployer: null,
  jobsApplicationDeleted: [],
  jobsApplicationNotSaved: [],
  jobsApplicationSaved: [],
  jobSlug: null,
  jobsOfEmployer: [],
  jobTrash: [],
  participantsEvent: [],
  postJobData: null,
  status: false,
  statusJobDetail: false,
  tabItem: "NotSaved",
};

const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    handleChangeCountStatus: (state, action) => {
      const { prevStatus, nextStatus } = action.payload;
      state.applicationCount[prevStatus] =
        state.applicationCount[prevStatus] - 1;
      state.applicationCount[nextStatus] =
        state.applicationCount[nextStatus] + 1;
    },
    changeTabsItem: (state, action) => {
      state.tabItem = action.payload;
    },
    addDataPostJob: (state, action) => {
      state.postJobData = { ...state.postJobData, ...action.payload };
    },
    addDataFilter: (state, action) => {
      state.dataFilter = { ...action.payload };
    },
    resetDataPostJob: (state) => {
      state.postJobData = null;
    },
    resetDataParticipants: (state) => {
      state.participantsEvent = [];
    },
    resetDataEvent: (state) => {
      state.eventDetailEmployer = null;
    },
    handChangeJobSlug: (state, action) => {
      state.jobSlug = action.payload;
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

    //Count Application Status
    [countApplicationStatusAsync.pending]: (state) => {
      state.status = true;
    },
    [countApplicationStatusAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.applicationCount = action.payload;
    },
    [countApplicationStatusAsync.rejected]: (state) => {
      state.status = false;
      state.applicationCount = null;
    },

    //fetcAllEventOfEmployerAsync
    [fetchAllEventOfEmployerAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchAllEventOfEmployerAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.eventsOfEmployer = action.payload;
    },
    [fetchAllEventOfEmployerAsync.rejected]: (state) => {
      state.status = false;
      state.eventsOfEmployer = [];
    },

    //Fetc Event Detail
    [fetchEventDetailAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchEventDetailAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.eventDetailEmployer = action.payload;
    },
    [fetchEventDetailAsync.rejected]: (state) => {
      state.status = false;
      state.eventDetailEmployer = null;
    },

    //Fetch All Participants By idEvent
    [fetchParticipantsByIdEventAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchParticipantsByIdEventAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.participantsEvent = action.payload;
    },
    [fetchParticipantsByIdEventAsync.rejected]: (state) => {
      state.status = false;
      state.participantsEvent = [];
    },

    //Fetch All Event Deleted
    [fetchAllEventDeletedAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchAllEventDeletedAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.eventsDeleted = action.payload;
    },
    [fetchAllEventDeletedAsync.rejected]: (state) => {
      state.status = false;
      state.eventsDeleted = [];
    },
  },
});

export const {
  addDataFilter,
  addDataPostJob,
  changeTabsItem,
  deletedJobAppication,
  handChangeJobSlug,
  resetDataParticipants,
  handleChangeCountStatus,
  resetDataEvent,
  resetDataPostJob,
  restoredJobApplication,
  savedJobApplication,
} = employerSlice.actions;
export default employerSlice.reducer;
