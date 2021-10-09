import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobs } from "features/Home/api/home.api";
import { getDetailJobSeeker } from "../api/jobSeeker.api";

export const getDetailJobSeekerAsync = createAsyncThunk(
  "jobSeeker/getDetailJobSeeker",
  async () => {
    const res = await getDetailJobSeeker();
    return res.data.jobSeeker;
  }
);

export const fetchJobsAsync = createAsyncThunk(
  "jobSeeker/fetchJobs",
  async () => {
    const res = await fetchJobs();
    return res.data.job;
  }
);
