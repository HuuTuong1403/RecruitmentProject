import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAlLEmployer,
  fetchEmployerDetail,
} from "../api/systemManager.api";

export const fetchAllEmployerAsync = createAsyncThunk(
  "systemManagement/fetchAllEmployer",
  async () => {
    const res = await fetchAlLEmployer();
    return res.data.employer;
  }
);

export const fetchEmployerDetailAsync = createAsyncThunk(
  "systemManagement/fetchEmployerDetail",
  async (payload) => {
    const res = await fetchEmployerDetail(payload);
    return res.data.employer;
  }
);
