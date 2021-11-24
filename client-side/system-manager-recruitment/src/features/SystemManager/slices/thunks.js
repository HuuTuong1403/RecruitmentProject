import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchAlLEmployer,
  fetchEmployerDetail,
  getSystemManagerDetail,
  fetchAllJob,
} from '../api/systemManager.api'

export const fetchAllEmployerAsync = createAsyncThunk(
  'systemManagement/fetchAllEmployer',
  async () => {
    const response = await fetchAlLEmployer()
    return response.data.employer
  }
)

export const fetchEmployerDetailAsync = createAsyncThunk(
  'systemManagement/fetchEmployerDetail',
  async (payload) => {
    const response = await fetchEmployerDetail(payload)
    return response.data.employer
  }
)

export const getSystemManagerDetailAsync = createAsyncThunk(
  'systemManagement/getSystemManagerDetail',
  async () => {
    const response = await getSystemManagerDetail()
    return response.data.systemManager
  }
)

export const fetchAllJobAsync = createAsyncThunk('systemManagement/fetchAllJob', async () => {
  const response = await fetchAllJob()
  return response.data.data
})
