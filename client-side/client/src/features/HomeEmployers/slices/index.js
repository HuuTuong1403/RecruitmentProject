import { createSlice } from '@reduxjs/toolkit'
import { signInEmployerAsync } from './thunks'

const initialState = {
  signUpInformation: {},
  employer: null,
  status: false,
}

export const authEmployerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    addInfoSignUp: (state, action) => {
      state.signUpInformation = action.payload
    },
    logoutEmployer: (state) => {
      state.employer = null
      localStorage.removeItem('token')
      localStorage.removeItem('employer')
    },
  },
  extraReducers: {
    [signInEmployerAsync.pending]: (state) => {
      state.status = true
      state.employer = null
    },
    [signInEmployerAsync.fulfilled]: (state, action) => {
      const { token, data } = action.payload
      state.status = false
      if (token && data) {
        state.employer = data?.Employer
        localStorage.setItem('token', token)
        localStorage.setItem('employer', JSON.stringify(state.employer))
      } else {
        state.employer = null
      }
    },
    [signInEmployerAsync.rejected]: (state) => {
      state.employer = null
      state.status = false
    },
  },
})

export const { addInfoSignUp, logoutEmployer } = authEmployerSlice.actions

export default authEmployerSlice.reducer
