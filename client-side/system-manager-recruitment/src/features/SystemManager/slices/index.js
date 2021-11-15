import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllEmployerAsync,
  fetchEmployerDetailAsync,
  getSystemManagerDetailAsync,
  fetchAllJobAsync,
} from "./thunks";

const initialState = {
  employers: null,
  employer: null,
  systemManager: null,
  jobs: null,
  status: false,
};

export const systemManagementSlice = createSlice({
  name: "systemManagement",
  initialState,
  reducers: {},
  extraReducers: {
    //Fetch All Employer
    [fetchAllEmployerAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchAllEmployerAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.employers = action.payload;
    },
    [fetchAllEmployerAsync.rejected]: (state) => {
      state.status = false;
      state.employers = null;
    },

    //Fetch detail Employer
    [fetchEmployerDetailAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchEmployerDetailAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.employer = action.payload;
    },
    [fetchEmployerDetailAsync.rejected]: (state) => {
      state.status = false;
      state.employer = null;
    },

    //Get Detail System Manager
    [getSystemManagerDetailAsync.pending]: (state) => {
      state.status = true;
    },
    [getSystemManagerDetailAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.systemManager = action.payload;
    },
    [getSystemManagerDetailAsync.rejected]: (state) => {
      state.status = false;
      state.systemManager = null;
    },

    //Fetch Data Job
    [fetchAllJobAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchAllJobAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.jobs = action.payload;
    },
    [fetchAllJobAsync.rejected]: (state) => {
      state.status = false;
      state.jobs = null;
    },
  },
});

export default systemManagementSlice.reducer;
