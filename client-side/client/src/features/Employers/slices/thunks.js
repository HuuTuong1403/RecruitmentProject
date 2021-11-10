import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  countApplicationStatus,
  fetchAllEventOfEmployer,
  fetchEventDetail,
  fetchJobDeleted,
  fetchJobDetailOfEmployer,
  fetchJobsApplicationDeleted,
  fetchJobsApplicationNotSaved,
  fetchJobsApplicationSaved,
  fetchJobsOfEmployer,
  getDetailEmployer,
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

export const fetchJobsApplicationNotSavedAsync = createAsyncThunk(
  "employer/fetchJobsApplicationNotSaved",
  async (payload) => {
    const res = await fetchJobsApplicationNotSaved(payload);
    return res.data.data;
  }
);

export const fetchJobsApplicationSavedAsync = createAsyncThunk(
  "employer/fetchJobsApplicationSaved",
  async (payload) => {
    const res = await fetchJobsApplicationSaved(payload);
    return res.data.data;
  }
);

export const fetchJobsApplicationDeletedAsync = createAsyncThunk(
  "employer/fetchJobsApplicationDeleted",
  async (payload) => {
    const res = await fetchJobsApplicationDeleted(payload);
    return res.data.data;
  }
);

export const countApplicationStatusAsync = createAsyncThunk(
  "employer/countApplicationStatus",
  async () => {
    const res = await countApplicationStatus();
    return res.data.data;
  }
);

export const fetchAllEventOfEmployerAsync = createAsyncThunk(
  "employer/fetchAllEventOfEmployer",
  async () => {
    const res = await fetchAllEventOfEmployer();
    return res.data.data;
  }
);

export const fetchEventDetailAsync = createAsyncThunk(
  "employer/fetchEventDetail",
  async (payload) => {
    const res = await fetchEventDetail(payload);
    return res.data.data;
  }
);
