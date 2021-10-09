import { createSlice } from "@reduxjs/toolkit";
import { getDetailEmployerAsync } from "features/Employers/slices/thunks";

const initialState = {
  employerDetail: null,
  status: false,
};

const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {},
  extraReducers: {
    [getDetailEmployerAsync.pending]: (state) => {
      state.status = true;
    },
    [getDetailEmployerAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.employerDetail = action?.payload;
    },
    [getDetailEmployerAsync.rejected]: (state) => {
      state.status = false;
      state.employerDetail = null;
    },
  },
});

export default employerSlice.reducer;
