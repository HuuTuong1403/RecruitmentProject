import { createSlice } from "@reduxjs/toolkit";
import {
  fetchJobsAsync,
  fetchProvincesAsync,
  fetchDistrictsByProvinceAsync,
  fetchWardsByDistrictsAsync,
  signInGuestAsync,
} from "./thunks";

const initialState = {
  jobs: [],
  provinces: [],
  districts: [],
  wards: [],
  status: false,
  user: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    logoutJobSeeker: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [fetchJobsAsync.pending]: (state) => {
      state.jobs = [];
      state.status = true;
    },
    [fetchJobsAsync.fulfilled]: (state, action) => {
      state.jobs = action?.payload;
      state.status = false;
    },
    [fetchJobsAsync.rejected]: (state) => {
      state.status = false;
    },
    [fetchProvincesAsync.pending]: (state) => {
      state.provinces = [];
    },
    [fetchProvincesAsync.fulfilled]: (state, action) => {
      state.provinces = action?.payload;
    },
    [fetchProvincesAsync.rejected]: (state) => {
      state.provinces = [];
    },
    [fetchDistrictsByProvinceAsync.pending]: (state) => {
      state.districts = [];
    },
    [fetchDistrictsByProvinceAsync.fulfilled]: (state, action) => {
      state.districts = action?.payload;
    },
    [fetchDistrictsByProvinceAsync.rejected]: (state) => {
      state.districts = [];
    },
    [fetchWardsByDistrictsAsync.pending]: (state) => {
      state.wards = [];
    },
    [fetchWardsByDistrictsAsync.fulfilled]: (state, action) => {
      state.wards = action?.payload;
    },
    [fetchWardsByDistrictsAsync.rejected]: (state) => {
      state.wards = [];
    },
    [signInGuestAsync.pending]: (state) => {
      state.status = true;
      state.user = null;
    },
    [signInGuestAsync.fulfilled]: (state, action) => {
      const { token, data } = action?.payload;
      state.status = false;
      if (token && data) {
        if (data?.JobSeeker?.isEmailVerified) {
          state.user = data?.JobSeeker;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      } else {
        state.user = null;
      }
    },
    [signInGuestAsync.rejected]: (state) => {
      state.user = null;
      state.status = false;
    },
  },
});

export const { logoutJobSeeker } = homeSlice.actions;

export default homeSlice.reducer;
