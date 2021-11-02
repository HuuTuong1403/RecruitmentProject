import { configureStore } from "@reduxjs/toolkit";
import authEmployerReducer from "features/HomeEmployers/slices";
import employerReducer from "features/Employers/slices";
import homeReducer from "features/Home/slices";
import jobReducer from "features/Jobs/slices";
import jobSeekerReducer from "features/JobSeekers/slices";

const store = configureStore({
  reducer: {
    home: homeReducer,
    authEmployer: authEmployerReducer,
    job: jobReducer,
    jobSeeker: jobSeekerReducer,
    employer: employerReducer,
  },
});

export default store;
