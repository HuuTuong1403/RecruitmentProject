import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobs } from "../api/home.api";

export const fetchJobsAsync = createAsyncThunk("home/fetchJobs", async () => {
  const res = await fetchJobs();
  return res;
});
