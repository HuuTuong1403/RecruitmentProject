import { createAsyncThunk } from '@reduxjs/toolkit'
import { getEntryTestById } from '../api/entryTests.api'

export const getEntryTestByIdAsync = createAsyncThunk(
  'entryTests/getEntryTestById',
  async (payload) => {
    const res = await getEntryTestById(payload)
    return res.data.data
  }
)
