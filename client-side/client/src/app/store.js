import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "features/Home/slices";
import authEmployerReducer from "features/HomeEmployers/slices";
import jobReducer from "features/Jobs/slices";
import jobSeekerReducer from "features/JobSeekers/slices";

const store = configureStore({
  reducer: {
    home: homeReducer,
    authEmployer: authEmployerReducer,
    job: jobReducer,
    jobSeeker: jobSeekerReducer,
  },
});

export default store;
