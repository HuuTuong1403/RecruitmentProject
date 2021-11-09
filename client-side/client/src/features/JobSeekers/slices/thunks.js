import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDetailJobSeeker,
  fetchAllFavoriteJob,
  fetchAllJobApplication,
  fetchAllEventJoined,
} from "../api/jobSeeker.api";

export const getDetailJobSeekerAsync = createAsyncThunk(
  "jobSeeker/getDetailJobSeeker",
  async () => {
    const res = await getDetailJobSeeker();
    return res.data.jobSeeker;
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

export const fetchAllEventJoinedAsync = createAsyncThunk(
  "jobSeeker/fetchAllEventJoined",
  async () => {
    const res = await fetchAllEventJoined();
    return res.data.data;
  }
);
