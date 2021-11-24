import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInAuth } from '../api/auth.api'

export const signInAuthAsync = createAsyncThunk('systemManager/signInAuth', async (payload) => {
  const res = await signInAuth(payload)
  return res
})
