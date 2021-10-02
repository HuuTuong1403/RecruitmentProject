import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "features/Home/slices";
import authEmployerReducer from "features/HomeEmployers/slices";

const store = configureStore({
  reducer: {
    home: homeReducer,
    authEmployer: authEmployerReducer,
  },
});

export default store;
