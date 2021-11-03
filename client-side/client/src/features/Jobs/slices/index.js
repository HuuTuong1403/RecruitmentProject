import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCompanyDetailAsync,
  fetchJobDetailAsync,
  fetchJobsAllAsync,
  fetchJobsSearchAsync,
  fetchSkillsAsync,
  fetchReviewOfCompanyAsync,
} from "./thunks";

const initialState = {
  jobsSearch: [],
  jobDetail: {},
  companyDetail: null,
  skills: [],
  reviews: [],
  status: false,
  isFilter: false,
};

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    toggleOpenFilter: (state) => {
      state.isFilter = !state.isFilter;
    },
  },
  extraReducers: {
    [fetchJobsSearchAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchJobsSearchAsync.fulfilled]: (state, action) => {
      state.jobsSearch = action.payload;
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
      state.jobsSearch = action.payload;
      state.status = false;
    },
    [fetchJobsAllAsync.rejected]: (state) => {
      state.jobsSearch = [];
      state.status = false;
    },
    [fetchJobDetailAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchJobDetailAsync.fulfilled]: (state, action) => {
      state.jobDetail = action.payload;
      state.status = false;
    },
    [fetchJobDetailAsync.rejected]: (state) => {
      state.jobDetail = {};
      state.status = false;
    },
    [fetchSkillsAsync.pending]: (state) => {
      state.skills = [];
    },
    [fetchSkillsAsync.fulfilled]: (state, action) => {
      state.skills = action.payload;
    },
    [fetchSkillsAsync.rejected]: (state) => {
      state.skills = [];
    },
    [fetchCompanyDetailAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchCompanyDetailAsync.fulfilled]: (state, action) => {
      state.companyDetail = action.payload;
      state.status = false;
    },
    [fetchCompanyDetailAsync.rejected]: (state) => {
      state.companyDetail = null;
      state.status = false;
    },
    [fetchReviewOfCompanyAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchReviewOfCompanyAsync.fulfilled]: (state, action) => {
      state.reviews = action.payload;
      state.status = false;
    },
    [fetchReviewOfCompanyAsync.rejected]: (state) => {
      state.reviews = [];
      state.status = false;
    },
  },
});

export const { toggleOpenFilter } = jobSlice.actions;
export default jobSlice.reducer;
