import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllServicePackage, signInEmployer } from '../api/homeEmployer.api'

export const signInEmployerAsync = createAsyncThunk('employer/signInEmployer', async (payload) => {
  const res = await signInEmployer(payload)
  return res
})

export const getAllServicePackageAsync = createAsyncThunk(
  'employer/getAllServicePackage',
  async () => {
    const res = await getAllServicePackage()
    return res.data.data
  }
)
