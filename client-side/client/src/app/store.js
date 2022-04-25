import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authEmployerReducer from 'features/HomeEmployers/slices'
import employerReducer from 'features/Employers/slices'
import homeReducer from 'features/Home/slices'
import jobReducer from 'features/Jobs/slices'
import jobSeekerReducer from 'features/JobSeekers/slices'
import eventsReducer from 'features/Events/slices'

const store = configureStore({
  reducer: {
    authEmployer: authEmployerReducer,
    employer: employerReducer,
    event: eventsReducer,
    home: homeReducer,
    job: jobReducer,
    jobSeeker: jobSeekerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
