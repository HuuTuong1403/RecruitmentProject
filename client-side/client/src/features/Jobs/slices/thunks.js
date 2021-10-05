import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobsAll, fetchJobsSearch, fetchJobDetail } from "../api/jobs.api";

export const fetchJobsSearchAsync = createAsyncThunk(
  "jobs/fetchJobsSearch",
  async (payload) => {
    const res = await fetchJobsSearch(payload);
    return res.data.job;
  }
);

export const fetchJobsAllAsync = createAsyncThunk(
  "jobs/fetchJobsAll",
  async () => {
    const res = await fetchJobsAll();
    return res.data.job;
  }
);

export const fetchJobDetailAsync = createAsyncThunk(
  "jobs/fetchJobDetail",
  async (payload) => {
    const res = await fetchJobDetail(payload);
    return res.data.job;
  }
);
