import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobs } from "features/Home/api/home.api";
import {
  getDetailJobSeeker,
  fetchAllFavoriteJob,
  fetchAllJobApplication,
} from "../api/jobSeeker.api";

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

export const fetchAllFavoriteJobAsync = createAsyncThunk(
  "jobSeeker/fetchAllFavoriteJob",
  async () => {
    const res = await fetchAllFavoriteJob();
    return res.data.data;
  }
);

export const fetchAllJobApplicationAsync = createAsyncThunk(
  "jobSeeker/fetchAllJobApplication",
  async () => {
    const res = await fetchAllJobApplication();
    return res.data.data;
  }
);
