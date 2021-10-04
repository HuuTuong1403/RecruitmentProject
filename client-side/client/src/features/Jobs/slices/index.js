import { createSlice } from "@reduxjs/toolkit";
import {
  fetchJobsSearchAsync,
  fetchJobsAllAsync,
  fetchJobDetailAsync,
} from "./thunks";

const initialState = {
  jobsSearch: [],
  status: false,
  jobDetail: {},
};

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchJobsSearchAsync.pending.toString()]: (state) => {
      state.jobsSearch = [];
      state.status = true;
    },
    [fetchJobsSearchAsync.fulfilled.toString()]: (state, action) => {
      state.jobsSearch = action?.payload;
      state.status = false;
    },
    [fetchJobsSearchAsync.rejected.toString()]: (state) => {
      state.jobsSearch = [];
      state.status = false;
    },
    [fetchJobsAllAsync.pending.toString()]: (state) => {
      state.jobsSearch = [];
      state.status = true;
    },
    [fetchJobsAllAsync.fulfilled.toString()]: (state, action) => {
      state.jobsSearch = action?.payload;
      state.status = false;
    },
    [fetchJobsAllAsync.rejected.toString()]: (state) => {
      state.jobsSearch = [];
      state.status = false;
    },
    [fetchJobDetailAsync.pending.toString()]: (state) => {
      state.jobDetail = {};
      state.status = true;
    },
    [fetchJobDetailAsync.fulfilled.toString()]: (state, action) => {
      state.jobDetail = action?.payload;
      state.status = false;
    },
    [fetchJobDetailAsync.rejected.toString()]: (state) => {
      state.jobDetail = {};
      state.status = false;
    },
  },
});

export default jobSlice.reducer;
