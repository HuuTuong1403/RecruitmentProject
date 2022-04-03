import { createSlice } from '@reduxjs/toolkit'
import { getAllServicePackageAsync, signInEmployerAsync } from './thunks'

const initialState = {
  signUpInformation: {},
  servicePackages: [],
  employer: null,
  packageId: '',
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
    getPackagePayment: (state, action) => {
      state.packageId = action.payload
      return state.packageId
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
    // #region Get All Service Packages
    [getAllServicePackageAsync.pending]: (state) => {
      state.status = true
      state.servicesPackages = []
    },
    [getAllServicePackageAsync.fulfilled]: (state, action) => {
      state.status = false
      state.servicePackages = action.payload
    },
    [getAllServicePackageAsync.rejected]: (state) => {
      state.employer = null
      state.status = false
    },
    // #endregion
  },
})

export const { addInfoSignUp, logoutEmployer, getPackagePayment } = authEmployerSlice.actions

export default authEmployerSlice.reducer
