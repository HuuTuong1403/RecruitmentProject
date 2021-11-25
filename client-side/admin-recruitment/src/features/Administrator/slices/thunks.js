import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAdministratorDetail } from '../api/admin.api'

export const getAdministratorDetailAsync = createAsyncThunk(
  'admin/getAdministratorDetail',
  async (payload) => {
    const response = await getAdministratorDetail(payload)
    return response
  }
)
