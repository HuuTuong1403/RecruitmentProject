import { createSlice } from '@reduxjs/toolkit'
import { signInAuthAsync } from './thunks'

const initialState = {
  adminAuth: null,
  status: false,
}

export const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    logoutHandler: (state) => {
      state.adminAuth = null
      localStorage.removeItem('admin')
      localStorage.removeItem('token')
    },
  },
  extraReducers: {
    [signInAuthAsync.pending]: (state) => {
      state.status = true
    },
    [signInAuthAsync.fulfilled]: (state, action) => {
      const { token, data } = action?.payload
      state.status = false
      if (token && data) {
        state.adminAuth = data?.systemAdmin
        localStorage.setItem('token', token)
        localStorage.setItem('admin', JSON.stringify(state.adminAuth))
      } else {
        state.adminAuth = null
      }
    },
    [signInAuthAsync.rejected]: (state) => {
      state.status = false
      state.adminAuth = null
    },
  },
})

export const { logoutHandler } = adminAuthSlice.actions
export default adminAuthSlice.reducer
