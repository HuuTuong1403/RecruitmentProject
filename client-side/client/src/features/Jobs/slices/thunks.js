import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchJobsAll,
  fetchJobsSearch,
  fetchJobDetail,
  fetchSkills,
  fetchCompanyDetail,
  fetchReviewOfCompany,
  fetchReviewDetail,
} from '../api/jobs.api'

export const fetchJobsSearchAsync = createAsyncThunk('jobs/fetchJobsSearch', async (payload) => {
  const res = await fetchJobsSearch(payload)
  return res.data.data
})

export const fetchJobsAllAsync = createAsyncThunk('jobs/fetchJobsAll', async () => {
  const res = await fetchJobsAll()
  return res.data.data
})

export const fetchJobDetailAsync = createAsyncThunk('jobs/fetchJobDetail', async (payload) => {
  const res = await fetchJobDetail(payload)
  return res.data.data
})

export const fetchSkillsAsync = createAsyncThunk('jobs/fetchSkills', async () => {
  const res = await fetchSkills()
  return res.data
})

export const fetchCompanyDetailAsync = createAsyncThunk(
  'jobs/fetchCompanyDetail',
  async (payload) => {
    const res = await fetchCompanyDetail(payload)
    return res.data.data
  }
)

export const fetchReviewOfCompanyAsync = createAsyncThunk(
  'jobs/fetchReviewOfCompany',
  async (payload) => {
    const res = await fetchReviewOfCompany(payload)
    return res.data.data
  }
)

export const fetchReviewDetailAsync = createAsyncThunk(
  'jobs/fetchReviewDetail',
  async (payload) => {
    const res = await fetchReviewDetail(payload)
    return res.data.data
  }
)
