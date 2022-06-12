import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  countApplicationStatus,
  fetchAllEventOfEmployer,
  fetchEventDetail,
  fetchJobDeleted,
  fetchJobDetailOfEmployer,
  fetchJobsApplicationDeleted,
  fetchJobsApplicationNotSaved,
  fetchJobsApplicationSaved,
  fetchJobsOfEmployer,
  fetchParticipantsByIdEvent,
  fetchAllEventDeleted,
  getDetailEmployer,
  fetchCart,
  getAvailableServicePackage,
  getAllQuestion,
  getAllQuestionDeleted,
  getAllEntryTest,
  getAllEntryTestDeleted,
  getAnswerSheetById,
} from '../api/employer.api'

export const getDetailEmployerAsync = createAsyncThunk('employer/getDetailEmployer', async () => {
  const res = await getDetailEmployer()
  return res.data.data
})

export const fetchJobsOfEmployerAsync = createAsyncThunk(
  'employer/fetchJobsOfEmployer',
  async () => {
    const res = await fetchJobsOfEmployer()
    return res.data.data
  }
)

export const fetchJobDetailOfEmployerAsync = createAsyncThunk(
  'employer/fetchJobDetailOfEmployer',
  async (payload) => {
    const res = await fetchJobDetailOfEmployer(payload)
    return res.data.data
  }
)

export const fetchJobDeletedAsync = createAsyncThunk('employer/fetchJobDeleted', async () => {
  const res = await fetchJobDeleted()
  return res.data.data
})

export const fetchJobsApplicationNotSavedAsync = createAsyncThunk(
  'employer/fetchJobsApplicationNotSaved',
  async (payload) => {
    const res = await fetchJobsApplicationNotSaved(payload)
    return res.data.data
  }
)

export const fetchJobsApplicationSavedAsync = createAsyncThunk(
  'employer/fetchJobsApplicationSaved',
  async (payload) => {
    const res = await fetchJobsApplicationSaved(payload)
    return res.data.data
  }
)

export const fetchJobsApplicationDeletedAsync = createAsyncThunk(
  'employer/fetchJobsApplicationDeleted',
  async (payload) => {
    const res = await fetchJobsApplicationDeleted(payload)
    return res.data.data
  }
)

export const countApplicationStatusAsync = createAsyncThunk(
  'employer/countApplicationStatus',
  async (payload) => {
    const res = await countApplicationStatus(payload)
    return res.data.data
  }
)

export const fetchAllEventOfEmployerAsync = createAsyncThunk(
  'employer/fetchAllEventOfEmployer',
  async () => {
    const res = await fetchAllEventOfEmployer()
    return res.data.data
  }
)

export const fetchEventDetailAsync = createAsyncThunk(
  'employer/fetchEventDetail',
  async (payload) => {
    const res = await fetchEventDetail(payload)
    return res.data.data
  }
)

export const fetchParticipantsByIdEventAsync = createAsyncThunk(
  'employer/fetchParticipantsByIdEvent',
  async (payload) => {
    const res = await fetchParticipantsByIdEvent(payload)
    return res.data.data
  }
)

export const fetchAllEventDeletedAsync = createAsyncThunk(
  'employer/fetchAllEventDeleted',
  async (payload) => {
    const res = await fetchAllEventDeleted()
    return res.data.data
  }
)

export const fetchCartAsync = createAsyncThunk('employer/fetchCart', async () => {
  const res = await fetchCart()
  return res.data.data
})

export const getAvailableServicePackageAsync = createAsyncThunk(
  'employer/getAvailableServicePackage',
  async () => {
    const res = await getAvailableServicePackage()
    const datas = (res.data || {}).data || []
    return datas
  }
)

export const getAllQuestionAsync = createAsyncThunk('employer/getAllQuestion', async (payload) => {
  const res = await getAllQuestion(payload)
  const datas = (res.data || {}).data || []
  return datas
})

export const getAllQuestionDeletedAsync = createAsyncThunk(
  'employer/getAllQuestionDeleted',
  async () => {
    const res = await getAllQuestionDeleted()
    const datas = (res.data || {}).data || []
    return datas
  }
)

export const getAllEntryTestAsync = createAsyncThunk('employer/getAllEntryTest', async () => {
  const res = await getAllEntryTest()
  const datas = (res.data || {}).data || []
  return datas
})

export const getAllEntryTestDeletedAsync = createAsyncThunk(
  'employer/getAllEntryTestDeleted',
  async () => {
    const res = await getAllEntryTestDeleted()
    const datas = (res.data || {}).data || []
    return datas
  }
)

export const getAnswerSheetByIdAsync = createAsyncThunk(
  'employer/getAnswerSheetById',
  async (payload) => {
    const res = await getAnswerSheetById(payload)
    const datas = (res.data || {}).data || []
    return datas
  }
)
