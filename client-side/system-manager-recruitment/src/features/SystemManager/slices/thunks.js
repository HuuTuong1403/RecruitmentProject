import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAlLEmployer,
  fetchEmployerDetail,
  getSystemManagerDetail,
} from "../api/systemManager.api";

export const fetchAllEmployerAsync = createAsyncThunk(
  "systemManagement/fetchAllEmployer",
  async () => {
    const response = await fetchAlLEmployer();
    return response;
  }
);

export const fetchEmployerDetailAsync = createAsyncThunk(
  "systemManagement/fetchEmployerDetail",
  async (payload) => {
    const response = await fetchEmployerDetail(payload);
    return response;
  }
);

export const getSystemManagerDetailAsync = createAsyncThunk(
  "systemManagement/getSystemManagerDetail",
  async () => {
    const response = await getSystemManagerDetail();
    return response;
  }
);
