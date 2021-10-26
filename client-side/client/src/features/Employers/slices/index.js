import { createSlice } from "@reduxjs/toolkit";
import { getDetailEmployerAsync } from "features/Employers/slices/thunks";

const initialState = {
  employerDetail: null,
  postJobData: null,
  avatar: null,
  status: false,
};

const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    addDataPostJob: (state, action) => {
      state.postJobData = { ...state.postJobData, ...action.payload };
    },
    resetDataPostJob: (state) => {
      state.postJobData = null;
    },
  },
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

export const { addDataPostJob, resetDataPostJob } =
  employerSlice.actions;
export default employerSlice.reducer;
