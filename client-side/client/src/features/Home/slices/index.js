import { createSlice } from "@reduxjs/toolkit";
import { fetchJobsAsync } from "./thunks";

const initialState = {
  jobs: [],
  status: false,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchJobsAsync.pending.toString()]: (state) => {
      state.jobs = [];
      state.status = true;
    },
    [fetchJobsAsync.fulfilled.toString()]: (state, action) => {
      state.jobs = action?.payload;
      state.status = false;
    },
    [fetchJobsAsync.rejected.toString()]: (state) => {
      state.status = false;
    },
  },
});

export const { fetchJobs } = homeSlice.actions;

export default homeSlice.reducer;
