import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default employerSlice.reducer;
