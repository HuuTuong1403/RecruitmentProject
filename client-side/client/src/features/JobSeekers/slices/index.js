import { createSlice } from '@reduxjs/toolkit'
import {
  fetchAllFavoriteJobAsync,
  getDetailJobSeekerAsync,
  fetchAllJobApplicationAsync,
  fetchAllEventJoinedAsync,
} from './thunks'

const initialState = {
  status: false,
  jobSeekerProfile: null,
  updateProfileData: null,
  favoriteJobs: [],
  applicationJobs: [],
  joinedEvent: [],
}

export const jobSeekerSlice = createSlice({
  name: 'jobSeeker',
  initialState,
  reducers: {
    resetFavoriteJob: (state) => {
      state.favoriteJobs = []
      state.applicationJobs = []
      state.joinedEvent = []
      state.jobSeekerProfile = null
    },
    addJobToFavorite: (state, action) => {
      state.favoriteJobs.push(action.payload)
    },
    removeJobOfFavorire: (state, action) => {
      const idJob = action.payload
      state.favoriteJobs = state.favoriteJobs.filter((item) => item._id !== idJob)
    },
  },
  extraReducers: {
    //Get Detail Job Seeker
    [getDetailJobSeekerAsync.pending]: (state) => {
      state.status = true
      state.jobSeekerProfile = null
    },
    [getDetailJobSeekerAsync.fulfilled]: (state, action) => {
      state.status = false
      state.jobSeekerProfile = action.payload
    },
    [getDetailJobSeekerAsync.rejected]: (state) => {
      state.status = false
      state.jobSeekerProfile = null
    },

    //Fetch All Job Favorite
    [fetchAllFavoriteJobAsync.pending]: (state) => {
      state.status = true
    },
    [fetchAllFavoriteJobAsync.fulfilled]: (state, action) => {
      state.favoriteJobs = action.payload
      state.status = false
    },
    [fetchAllFavoriteJobAsync.rejected]: (state) => {
      state.status = false
      state.favoriteJobs = []
    },

    //Fetch All Job Application
    [fetchAllJobApplicationAsync.pending]: (state) => {
      state.status = true
    },
    [fetchAllJobApplicationAsync.fulfilled]: (state, action) => {
      state.applicationJobs = action.payload
      state.status = false
    },
    [fetchAllJobApplicationAsync.rejected]: (state) => {
      state.status = false
      state.applicationJobs = []
    },

    //Fetch All Event Joined
    [fetchAllEventJoinedAsync.pending]: (state) => {
      state.status = true
    },
    [fetchAllEventJoinedAsync.fulfilled]: (state, action) => {
      state.joinedEvent = action.payload
      state.status = false
    },
    [fetchAllEventJoinedAsync.rejected]: (state) => {
      state.joinedEvent = []
      state.status = false
    },
  },
})
export const { addJobToFavorite, removeJobOfFavorire, resetFavoriteJob } = jobSeekerSlice.actions
export default jobSeekerSlice.reducer
