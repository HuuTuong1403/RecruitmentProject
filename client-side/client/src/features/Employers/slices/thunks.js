import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDetailEmployer,
  fetchJobsOfEmployer,
  fetchJobDetailOfEmployer,
  fetchJobDeleted,
  fetchAllApplication,
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

export const fetchJobDeletedAsync = createAsyncThunk(
  "employer/fetchJobDeleted",
  async () => {
    const res = await fetchJobDeleted();
    return res.data.data;
  }
);

export const fetchAllApplicationAsync = createAsyncThunk(
  "employer/fetchAllApplication",
  async (payload) => {
    const res = await fetchAllApplication(payload);
    return res.data.data;
  }
);
