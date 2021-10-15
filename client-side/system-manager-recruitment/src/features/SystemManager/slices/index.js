import { createSlice } from "@reduxjs/toolkit";
import { fetchAllEmployerAsync, fetchEmployerDetailAsync } from "./thunks";

const initialState = {
  employers: null,
  employer: null,
  status: false,
};

export const systemManagementSlice = createSlice({
  name: "systemManagement",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllEmployerAsync.pending]: (state) => {
      state.status = true;
      state.employers = null;
    },
    [fetchAllEmployerAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.employers = action?.payload;
    },
    [fetchAllEmployerAsync.rejected]: (state) => {
      state.status = false;
      state.employers = null;
    },
    [fetchEmployerDetailAsync.pending]: (state) => {
      state.status = true;
      state.employer = null;
    },
    [fetchEmployerDetailAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.employer = action?.payload;
    },
    [fetchEmployerDetailAsync.rejected]: (state) => {
      state.status = false;
      state.employer = null;
    },
  },
});

export default systemManagementSlice.reducer;
