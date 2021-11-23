import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInEmployer } from '../api/homeEmployer.api'

export const signInEmployerAsync = createAsyncThunk('employer/signInEmployer', async (payload) => {
  const res = await signInEmployer(payload)
  return res
})
