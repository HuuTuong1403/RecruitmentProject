import { createSlice } from "@reduxjs/toolkit";
import { getDetailJobSeekerAsync } from "./thunks";

const initialState = {
  status: false,
  jobSeekerProfile: null,
};

export const jobSeekerSlice = createSlice({
  name: "jobSeeker",
  initialState,
  reducers: {},
  extraReducers: {
    [getDetailJobSeekerAsync.pending]: (state) => {
      state.status = true;
      state.jobSeekerProfile = null;
    },
    [getDetailJobSeekerAsync.fulfilled]: (state, action) => {
      state.status = false;
      state.jobSeekerProfile = action?.payload;
    },
    [getDetailJobSeekerAsync.rejected]: (state) => {
      state.status = false;
      state.jobSeekerProfile = null;
    },
  },
});

export default jobSeekerSlice.reducer;
