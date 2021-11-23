import { createSlice } from '@reduxjs/toolkit'
import {
  fetchCompanyDetailAsync,
  fetchJobDetailAsync,
  fetchJobsAllAsync,
  fetchJobsSearchAsync,
  fetchReviewDetailAsync,
  fetchReviewOfCompanyAsync,
  fetchSkillsAsync,
} from './thunks'

const initialState = {
  jobsSearch: [],
  jobDetail: {},
  companyDetail: null,
  skills: [],
  reviews: null,
  reviewDetail: null,
  status: false,
  statusReview: false,
  isFilter: false,
}

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    toggleOpenFilter: (state) => {
      state.isFilter = !state.isFilter
    },
    deleteReviewOfCompany: (state, action) => {
      const id = action.payload
      state.reviews = state.reviews.filter((review) => review._id !== id)
    },
  },
  extraReducers: {
    [fetchJobsSearchAsync.pending]: (state) => {
      state.status = true
    },
    [fetchJobsSearchAsync.fulfilled]: (state, action) => {
      state.jobsSearch = action.payload
      state.status = false
    },
    [fetchJobsSearchAsync.rejected]: (state) => {
      state.jobsSearch = []
      state.status = false
    },
    [fetchJobsAllAsync.pending]: (state) => {
      state.jobsSearch = []
      state.status = true
    },
    [fetchJobsAllAsync.fulfilled]: (state, action) => {
      state.jobsSearch = action.payload
      state.status = false
    },
    [fetchJobsAllAsync.rejected]: (state) => {
      state.jobsSearch = []
      state.status = false
    },
    [fetchJobDetailAsync.pending]: (state) => {
      state.status = true
    },
    [fetchJobDetailAsync.fulfilled]: (state, action) => {
      state.jobDetail = action.payload
      state.status = false
    },
    [fetchJobDetailAsync.rejected]: (state) => {
      state.jobDetail = {}
      state.status = false
    },
    [fetchSkillsAsync.pending]: (state) => {
      state.skills = []
    },
    [fetchSkillsAsync.fulfilled]: (state, action) => {
      state.skills = action.payload
    },
    [fetchSkillsAsync.rejected]: (state) => {
      state.skills = []
    },
    [fetchCompanyDetailAsync.pending]: (state) => {
      state.status = true
    },
    [fetchCompanyDetailAsync.fulfilled]: (state, action) => {
      state.companyDetail = action.payload
      state.status = false
    },
    [fetchCompanyDetailAsync.rejected]: (state) => {
      state.companyDetail = null
      state.status = false
    },
    [fetchReviewOfCompanyAsync.pending]: (state) => {
      state.statusReview = true
      state.reviews = null
    },
    [fetchReviewOfCompanyAsync.fulfilled]: (state, action) => {
      state.reviews = action.payload
      state.statusReview = false
    },
    [fetchReviewOfCompanyAsync.rejected]: (state) => {
      state.reviews = null
      state.statusReview = false
    },
    [fetchReviewDetailAsync.pending]: (state) => {
      state.statusReview = true
      state.reviewDetail = null
    },
    [fetchReviewDetailAsync.fulfilled]: (state, action) => {
      state.reviewDetail = action.payload
      state.statusReview = false
    },
    [fetchReviewDetailAsync.rejected]: (state) => {
      state.reviewDetail = null
      state.statusReview = false
    },
  },
})

export const { toggleOpenFilter, deleteReviewOfCompany } = jobSlice.actions
export default jobSlice.reducer
