import { configureStore } from "@reduxjs/toolkit";
import systemManageReducer from "features/Auth/slices";

const store = configureStore({
  reducer: {
    systemMange: systemManageReducer,
  },
});

export default store;
