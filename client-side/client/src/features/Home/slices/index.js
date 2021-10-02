import { createSlice } from "@reduxjs/toolkit";
import {
  fetchJobsAsync,
  fetchProvincesAsync,
  fetchDistrictsByProvinceAsync,
  fetchWardsByDistrictsAsync,
} from "./thunks";

const initialState = {
  jobs: [],
  provinces: [],
  districts: [],
  wards: [],
  status: false,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchJobsAsync.pending.toString()]: (state) => {
      state.jobs = [];
      state.status = true;
    },
    [fetchJobsAsync.fulfilled.toString()]: (state, action) => {
      state.jobs = action?.payload;
      state.status = false;
    },
    [fetchJobsAsync.rejected.toString()]: (state) => {
      state.status = false;
    },
    [fetchProvincesAsync.pending.toString()]: (state) => {
      state.provinces = [];
    },
    [fetchProvincesAsync.fulfilled.toString()]: (state, action) => {
      state.provinces = action?.payload;
    },
    [fetchProvincesAsync.pending.toString()]: (state) => {
      state.provinces = [];
    },
    [fetchDistrictsByProvinceAsync.pending.toString()]: (state) => {
      state.districts = [];
    },
    [fetchDistrictsByProvinceAsync.fulfilled.toString()]: (state, action) => {
      state.districts = action?.payload;
    },
    [fetchDistrictsByProvinceAsync.pending.toString()]: (state) => {
      state.districts = [];
    },
    [fetchWardsByDistrictsAsync.pending.toString()]: (state) => {
      state.wards = [];
    },
    [fetchWardsByDistrictsAsync.fulfilled.toString()]: (state, action) => {
      state.wards = action?.payload;
    },
    [fetchWardsByDistrictsAsync.pending.toString()]: (state) => {
      state.wards = [];
    },
  },
});

export default homeSlice.reducer;
