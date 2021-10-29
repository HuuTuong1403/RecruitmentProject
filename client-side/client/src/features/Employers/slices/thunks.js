import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDetailEmployer,
  fetchJobsOfEmployer,
  fetchJobDetailOfEmployer,
} from "../api/employer.api";

export const getDetailEmployerAsync = createAsyncThunk(
  "employer/getDetailEmployer",
  async () => {
    const res = await getDetailEmployer();
    return res.data.data;
  }
);

export const fetchJobsOfEmployerAsync = createAsyncThunk(
  "employer/fetchJobsOfEmployer",
  async () => {
    const res = await fetchJobsOfEmployer();
    return res.data.data;
  }
);

export const fetchJobDetailOfEmployerAsync = createAsyncThunk(
  "employer/fetchJobDetailOfEmployer",
  async (payload) => {
    const res = await fetchJobDetailOfEmployer(payload);
    return res.data.data;
  }
);
