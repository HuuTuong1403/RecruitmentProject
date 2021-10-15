import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "features/Auth/slices";

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
  },
});

export default store;
