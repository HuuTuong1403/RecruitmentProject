import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpInformation: {},
  status: false,
};

export const authEmployerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    addInfoSignUp: (state, action) => {
      state.signUpInformation = action.payload;
    },
  },
});

export const { addInfoSignUp } = authEmployerSlice.actions;

export default authEmployerSlice.reducer;
