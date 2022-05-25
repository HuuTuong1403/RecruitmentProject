import { createSlice } from '@reduxjs/toolkit'
import {
  countApplicationStatusAsync,
  fetchAllEventOfEmployerAsync,
  fetchEventDetailAsync,
  fetchJobDeletedAsync,
  fetchJobDetailOfEmployerAsync,
  fetchJobsApplicationDeletedAsync,
  fetchJobsApplicationNotSavedAsync,
  fetchJobsApplicationSavedAsync,
  fetchJobsOfEmployerAsync,
  fetchParticipantsByIdEventAsync,
  getDetailEmployerAsync,
  fetchAllEventDeletedAsync,
  fetchCartAsync,
  getAvailableServicePackageAsync,
  getAllQuestionAsync,
  getAllQuestionDeletedAsync,
} from 'features/Employers/slices/thunks'

const initialState = {
  applicationCount: null,
  availableSP: [],
  avatar: null,
  cart: [],
  dataFilter: null,
  employerDetail: null,
  eventDetailEmployer: null,
  eventsOfEmployer: [],
  eventsDeleted: [],
  jobDetailEmployer: null,
  jobsApplicationDeleted: [],
  jobsApplicationNotSaved: [],
  jobsApplicationSaved: [],
  jobSlug: null,
  jobsOfEmployer: [],
  jobTrash: [],
  participantsEvent: [],
  questions: [],
  postJobData: null,
  status: false,
  statusJobDetail: false,
  tabItem: 'NotSaved',
}

const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    handleChangeCountStatus: (state, action) => {
      const { prevStatus, nextStatus } = action.payload
      state.applicationCount[prevStatus] = state.applicationCount[prevStatus] - 1
      state.applicationCount[nextStatus] = state.applicationCount[nextStatus] + 1
    },
    changeTabsItem: (state, action) => {
      state.tabItem = action.payload
    },
    addDataPostJob: (state, action) => {
      state.postJobData = { ...state.postJobData, ...action.payload }
    },
    addDataFilter: (state, action) => {
      state.dataFilter = { ...action.payload }
    },
    resetDataPostJob: (state) => {
      state.postJobData = null
    },
    resetDataParticipants: (state) => {
      state.participantsEvent = []
    },
    resetDataEvent: (state) => {
      state.eventDetailEmployer = null
    },
    handChangeJobSlug: (state, action) => {
      state.jobSlug = action.payload
    },
    savedJobApplication: (state, action) => {
      const id = action.payload
      state.jobsApplicationNotSaved = state.jobsApplicationNotSaved.filter((job) => job._id !== id)
    },
    deletedJobAppication: (state, action) => {
      const id = action.payload
      state.jobsApplicationNotSaved = state.jobsApplicationNotSaved.filter((job) => job._id !== id)
    },
    restoredJobApplication: (state, action) => {
      const id = action.payload
      state.jobsApplicationDeleted = state.jobsApplicationDeleted.filter((job) => job._id !== id)
    },
    changeQuantity: (state, action) => {
      const { id, status, quantity } = action.payload

      let _quantity = quantity

      if (status === 'Increase') {
        _quantity = quantity + 1
      } else if (status === 'Decrease') {
        _quantity = quantity - 1
      }

      state.cart.servicePackages.forEach((item) => {
        if (item.servicePackage._id === id) {
          item.quantity = _quantity
        }
      })
    },
    clearServicePackageInCart: (state, action) => {
      const { id } = action.payload
      state.cart.servicePackages = state.cart.servicePackages.filter(
        (item) => item.servicePackage._id !== id
      )
    },
  },
  extraReducers: {
    // #region Get Detail Employer
    [getDetailEmployerAsync.pending]: (state) => {
      state.status = true
    },
    [getDetailEmployerAsync.fulfilled]: (state, action) => {
      state.status = false
      state.employerDetail = action.payload
    },
    [getDetailEmployerAsync.rejected]: (state) => {
      state.status = false
      state.employerDetail = null
    },
    // #endregion

    // #region Fetch Job Posting Of Employer
    [fetchJobsOfEmployerAsync.pending]: (state) => {
      state.status = true
    },
    [fetchJobsOfEmployerAsync.fulfilled]: (state, action) => {
      state.status = false
      state.jobsOfEmployer = action.payload
    },
    [fetchJobsOfEmployerAsync.rejected]: (state) => {
      state.status = false
      state.jobsOfEmployer = []
    },
    // #endregion

    // #region Fetch Job Detail
    [fetchJobDetailOfEmployerAsync.pending]: (state) => {
      state.statusJobDetail = true
    },
    [fetchJobDetailOfEmployerAsync.fulfilled]: (state, action) => {
      state.statusJobDetail = false
      state.jobDetailEmployer = action.payload
    },
    [fetchJobDetailOfEmployerAsync.rejected]: (state) => {
      state.statusJobDetail = false
      state.jobDetailEmployer = null
    },
    // #endregion

    // #region Fetch Job Deleted
    [fetchJobDeletedAsync.pending]: (state) => {
      state.status = true
    },
    [fetchJobDeletedAsync.fulfilled]: (state, action) => {
      state.status = false
      state.jobTrash = action.payload
    },
    [fetchJobDeletedAsync.rejected]: (state) => {
      state.status = false
      state.jobTrash = []
    },
    // #endregion

    // #region Fetch Jobs Application Not Saved
    [fetchJobsApplicationNotSavedAsync.pending]: (state) => {
      state.status = true
    },
    [fetchJobsApplicationNotSavedAsync.fulfilled]: (state, action) => {
      state.status = false
      state.jobsApplicationNotSaved = action.payload
    },
    [fetchJobsApplicationNotSavedAsync.rejected]: (state) => {
      state.status = false
      state.jobsApplicationNotSaved = []
    },
    // #endregion

    // #region Fetch Jobs Application Saved
    [fetchJobsApplicationSavedAsync.pending]: (state) => {
      state.status = true
    },
    [fetchJobsApplicationSavedAsync.fulfilled]: (state, action) => {
      state.status = false
      state.jobsApplicationSaved = action.payload
    },
    [fetchJobsApplicationSavedAsync.rejected]: (state) => {
      state.status = false
      state.jobsApplicationSaved = []
    },
    // #endregion

    // #region Fetch Jobs Application Deleted
    [fetchJobsApplicationDeletedAsync.pending]: (state) => {
      state.status = true
    },
    [fetchJobsApplicationDeletedAsync.fulfilled]: (state, action) => {
      state.status = false
      state.jobsApplicationDeleted = action.payload
    },
    [fetchJobsApplicationDeletedAsync.rejected]: (state) => {
      state.status = false
      state.jobsApplicationDeleted = []
    },
    // #endregion

    // #region Count Application Status
    [countApplicationStatusAsync.pending]: (state) => {
      state.status = true
    },
    [countApplicationStatusAsync.fulfilled]: (state, action) => {
      state.status = false
      state.applicationCount = action.payload
    },
    [countApplicationStatusAsync.rejected]: (state) => {
      state.status = false
      state.applicationCount = null
    },
    // #endregion

    // #region fetcAllEventOfEmployerAsync
    [fetchAllEventOfEmployerAsync.pending]: (state) => {
      state.status = true
    },
    [fetchAllEventOfEmployerAsync.fulfilled]: (state, action) => {
      state.status = false
      state.eventsOfEmployer = action.payload
    },
    [fetchAllEventOfEmployerAsync.rejected]: (state) => {
      state.status = false
      state.eventsOfEmployer = []
    },
    // #endregion

    // #region Fetch Event Detail
    [fetchEventDetailAsync.pending]: (state) => {
      state.status = true
    },
    [fetchEventDetailAsync.fulfilled]: (state, action) => {
      state.status = false
      state.eventDetailEmployer = action.payload
    },
    [fetchEventDetailAsync.rejected]: (state) => {
      state.status = false
      state.eventDetailEmployer = null
    },
    // #endregion

    // #region Fetch All Participants By idEvent
    [fetchParticipantsByIdEventAsync.pending]: (state) => {
      state.status = true
    },
    [fetchParticipantsByIdEventAsync.fulfilled]: (state, action) => {
      state.status = false
      state.participantsEvent = action.payload
    },
    [fetchParticipantsByIdEventAsync.rejected]: (state) => {
      state.status = false
      state.participantsEvent = []
    },
    // #endregion

    // #region Fetch All Event Deleted
    [fetchAllEventDeletedAsync.pending]: (state) => {
      state.status = true
    },
    [fetchAllEventDeletedAsync.fulfilled]: (state, action) => {
      state.status = false
      state.eventsDeleted = action.payload
    },
    [fetchAllEventDeletedAsync.rejected]: (state) => {
      state.status = false
      state.eventsDeleted = []
    },
    // #endregion

    // #region Fetch Cart
    [fetchCartAsync.pending]: (state) => {
      state.status = true
    },
    [fetchCartAsync.fulfilled]: (state, action) => {
      state.status = false
      state.cart = action.payload
    },
    [fetchCartAsync.rejected]: (state) => {
      state.status = false
      state.cart = []
    },
    // #endregion

    // #region Fetch Cart
    [getAvailableServicePackageAsync.pending]: (state) => {
      state.status = true
    },
    [getAvailableServicePackageAsync.fulfilled]: (state, action) => {
      state.status = false
      state.availableSP = action.payload
    },
    [getAvailableServicePackageAsync.rejected]: (state) => {
      state.status = false
      state.availableSP = []
    },
    // #endregion

    // #region Get All Question
    [getAllQuestionAsync.pending]: (state) => {
      state.status = true
    },
    [getAllQuestionAsync.fulfilled]: (state, action) => {
      state.status = false
      state.questions = action.payload
    },
    [getAllQuestionAsync.rejected]: (state) => {
      state.status = false
      state.questions = []
    },
    // #endregion

    // #region Get All Question Deleted
    [getAllQuestionDeletedAsync.pending]: (state) => {
      state.status = true
    },
    [getAllQuestionDeletedAsync.fulfilled]: (state, action) => {
      state.status = false
      state.questions = action.payload
    },
    [getAllQuestionDeletedAsync.rejected]: (state) => {
      state.status = false
      state.questions = []
    },
    // #endregion
  },
})

export const {
  addDataFilter,
  addDataPostJob,
  changeTabsItem,
  deletedJobAppication,
  handChangeJobSlug,
  resetDataParticipants,
  handleChangeCountStatus,
  resetDataEvent,
  resetDataPostJob,
  restoredJobApplication,
  savedJobApplication,
  changeQuantity,
  clearServicePackageInCart,
} = employerSlice.actions

export default employerSlice.reducer
