import { createSlice } from "@reduxjs/toolkit";
import {
  fetchJobsSearchAsync,
  fetchJobsAllAsync,
  fetchJobDetailAsync,
  fetchSkillsAsync,
} from "./thunks";

const initialState = {
  jobsSearch: [],
  status: false,
  jobDetail: {},
  skills: [],
};

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchJobsSearchAsync.pending]: (state) => {
      state.jobsSearch = [];
      state.status = true;
    },
    [fetchJobsSearchAsync.fulfilled]: (state, action) => {
      state.jobsSearch = action?.payload;
      state.status = false;
    },
    [fetchJobsSearchAsync.rejected]: (state) => {
      state.jobsSearch = [];
      state.status = false;
    },
    [fetchJobsAllAsync.pending]: (state) => {
      state.jobsSearch = [];
      state.status = true;
    },
    [fetchJobsAllAsync.fulfilled]: (state, action) => {
      state.jobsSearch = action?.payload;
      state.status = false;
    },
    [fetchJobsAllAsync.rejected]: (state) => {
      state.jobsSearch = [];
      state.status = false;
    },
    [fetchJobDetailAsync.pending]: (state) => {
      state.jobDetail = {};
      state.status = true;
    },
    [fetchJobDetailAsync.fulfilled]: (state, action) => {
      state.jobDetail = action?.payload;
      state.status = false;
    },
    [fetchJobDetailAsync.rejected]: (state) => {
      state.jobDetail = {};
      state.status = false;
    },
    [fetchSkillsAsync.pending]: (state) => {
      state.skills = [];
      state.status = true;
    },
    [fetchSkillsAsync.fulfilled]: (state, action) => {
      state.skills = action?.payload;
      state.status = false;
    },
    [fetchSkillsAsync.rejected]: (state) => {
      state.skills = [];
      state.status = false;
    },
  },
});

export default jobSlice.reducer;
