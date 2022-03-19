import { createSlice } from '@reduxjs/toolkit'
import {
  fetchAllEmployerAsync,
  fetchEmployerDetailAsync,
  getSystemManagerDetailAsync,
  fetchAllJobAsync,
  getAllServicePackageAsync,
  getAllServiceAsync,
  getAllDeletedServiceAsync,
} from './thunks'

const initialState = {
  employers: null,
  employer: null,
  systemManager: null,
  jobs: [],
  tabItem: 'unapproval',
  servicePackages: [],
  services: [],
  deletedServices: [],
  status: false,
}

export const systemManagementSlice = createSlice({
  name: 'systemManagement',
  initialState,
  reducers: {
    changeTabsItem: (state, action) => {
      state.tabItem = action.payload
    },
  },
  extraReducers: {
    // #region Fetch All Employer
    [fetchAllEmployerAsync.pending]: (state) => {
      state.status = true
    },
    [fetchAllEmployerAsync.fulfilled]: (state, action) => {
      state.status = false
      state.employers = action.payload
    },
    [fetchAllEmployerAsync.rejected]: (state) => {
      state.status = false
      state.employers = null
    },
    // #endregion

    // #region Fetch detail Employer
    [fetchEmployerDetailAsync.pending]: (state) => {
      state.status = true
    },
    [fetchEmployerDetailAsync.fulfilled]: (state, action) => {
      state.status = false
      state.employer = action.payload
    },
    [fetchEmployerDetailAsync.rejected]: (state) => {
      state.status = false
      state.employer = null
    },
    // #endregion

    // #region Get Detail System Manager
    [getSystemManagerDetailAsync.pending]: (state) => {
      state.status = true
    },
    [getSystemManagerDetailAsync.fulfilled]: (state, action) => {
      state.status = false
      state.systemManager = action.payload
    },
    [getSystemManagerDetailAsync.rejected]: (state) => {
      state.status = false
      state.systemManager = null
    },
    // #endregion

    // #region Fetch Data Job
    [fetchAllJobAsync.pending]: (state) => {
      state.status = true
    },
    [fetchAllJobAsync.fulfilled]: (state, action) => {
      state.status = false
      state.jobs = action.payload
    },
    [fetchAllJobAsync.rejected]: (state) => {
      state.status = false
      state.jobs = []
    },
    // #endregion

    // #region Get All Service Package
    [getAllServicePackageAsync.pending]: (state) => {
      state.status = true
    },
    [getAllServicePackageAsync.fulfilled]: (state, action) => {
      state.status = false
      state.servicePackages = action.payload
    },
    [getAllServicePackageAsync.rejected]: (state) => {
      state.status = false
      state.servicePackages = []
    },
    // #endregion

    // #region Get All Service
    [getAllServiceAsync.pending]: (state) => {
      state.status = true
    },
    [getAllServiceAsync.fulfilled]: (state, action) => {
      state.status = false
      state.services = action.payload
    },
    [getAllServiceAsync.rejected]: (state) => {
      state.status = false
      state.services = []
    },
    // #endregion

    // #region Get All Deleted Service
    [getAllDeletedServiceAsync.pending]: (state) => {
      state.status = true
    },
    [getAllDeletedServiceAsync.fulfilled]: (state, action) => {
      state.status = false
      state.deletedServices = action.payload
    },
    [getAllDeletedServiceAsync.rejected]: (state) => {
      state.status = false
      state.deletedServices = []
    },
    // #endregion
  },
})

export const { changeTabsItem } = systemManagementSlice.actions
export default systemManagementSlice.reducer
