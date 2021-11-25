import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInAuth } from '../api/authAdmin.api'

export const signInAuthAsync = createAsyncThunk('admin/signInAuth', async (payload) => {
  const res = await signInAuth(payload)
  return res
})
