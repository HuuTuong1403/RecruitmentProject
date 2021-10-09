import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchJobs,
  fetchProvinces,
  fetchDistricts,
  fetchWards,
  signInGuest,
} from "../api/home.api";

export const fetchJobsAsync = createAsyncThunk("home/fetchJobs", async () => {
  const res = await fetchJobs();
  return res.data.job;
});

export const fetchProvincesAsync = createAsyncThunk(
  "home/fetchProvinces",
  async () => {
    const res = await fetchProvinces();
    return res.data.province;
  }
);

export const fetchDistrictsByProvinceAsync = createAsyncThunk(
  "home/fetchDistrictByProvince",
  async ({ code }) => {
    const res = await fetchDistricts({ code });
    return res.data.district;
  }
);

export const fetchWardsByDistrictsAsync = createAsyncThunk(
  "home/fetchWardsByDistricts",
  async ({ code }) => {
    const res = await fetchWards({ code });
    return res.data.ward;
  }
);

export const signInGuestAsync = createAsyncThunk(
  "home/signInGuest",
  async (payload) => {
    const res = await signInGuest(payload);
    console.log(payload);
    console.log(res);
    return res;
  }
);
