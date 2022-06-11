import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAnswerSheetById, getEntryTestById } from '../api/entryTests.api'

export const getEntryTestByIdAsync = createAsyncThunk(
  'entryTests/getEntryTestById',
  async (payload) => {
    const res = await getEntryTestById(payload)
    return res.data.data
  }
)

export const getAnswerSheetByIdAsync = createAsyncThunk(
  'entryTests/getAnswerSheetById',
  async (payload) => {
    const res = await getAnswerSheetById(payload)
    return (res.data || {}).data || {}
  }
)
