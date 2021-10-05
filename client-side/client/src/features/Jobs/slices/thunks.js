import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchJobsAll,
  fetchJobsSearch,
  fetchJobDetail,
  fetchSkills,
} from "../api/jobs.api";

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

export const fetchSkillsAsync = createAsyncThunk(
  "jobs/fetchSkills",
  async () => {
    const res = await fetchSkills();
    return res.data;
  }
);
