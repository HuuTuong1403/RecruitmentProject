import { createSlice } from "@reduxjs/toolkit";
import { getAdministratorDetailAsync } from "./thunks";

const initialState = {
  adminDetail: null,
  status: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: {
    [getAdministratorDetailAsync.pending]: (state) => {
      state.status = true;
    },
    [getAdministratorDetailAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.adminDetail = action.payload.data.systemAdmin;
    },
    [getAdministratorDetailAsync.rejected]: (state) => {
      state.status = false;
      state.adminDetail = null;
    },
  },
});

export default adminSlice.reducer;
