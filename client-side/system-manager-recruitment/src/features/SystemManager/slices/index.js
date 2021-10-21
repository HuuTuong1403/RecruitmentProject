import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllEmployerAsync,
  fetchEmployerDetailAsync,
  getSystemManagerDetailAsync,
} from "./thunks";

const initialState = {
  employers: null,
  employer: null,
  systemManager: null,
  status: false,
};

export const systemManagementSlice = createSlice({
  name: "systemManagement",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllEmployerAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchAllEmployerAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.employers = action.payload.data.employer;
    },
    [fetchAllEmployerAsync.rejected]: (state) => {
      state.status = false;
      state.employers = null;
    },
    [fetchEmployerDetailAsync.pending]: (state) => {
      state.status = true;
    },
    [fetchEmployerDetailAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.employer = action.payload.data.employer;
    },
    [fetchEmployerDetailAsync.rejected]: (state) => {
      state.status = false;
      state.employer = null;
    },
    [getSystemManagerDetailAsync.pending]: (state) => {
      state.status = true;
    },
    [getSystemManagerDetailAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.systemManager = action.payload.data.systemManager;
    },
    [getSystemManagerDetailAsync.rejected]: (state) => {
      state.status = false;
      state.systemManager = null;
    },
  },
});

export default systemManagementSlice.reducer;
