import { createSlice } from '@reduxjs/toolkit'
import { fetcAllEventsAsync, fetchDetailEventAsync, fetchSearchEventsAsync } from './thunks'

const initialState = {
  events: [],
  eventDetail: {},
  status: false,
}

export const eventsSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: {
    //Fetch All Events
    [fetcAllEventsAsync.pending]: (state) => {
      state.status = true
      state.events = []
    },
    [fetcAllEventsAsync.fulfilled]: (state, action) => {
      state.events = action.payload
      state.status = false
    },
    [fetcAllEventsAsync.rejected]: (state) => {
      state.events = []
      state.status = false
    },

    //Fetch Detail Event
    [fetchDetailEventAsync.pending]: (state) => {
      state.status = true
    },
    [fetchDetailEventAsync.fulfilled]: (state, action) => {
      state.eventDetail = action.payload
      state.status = false
    },
    [fetchDetailEventAsync.rejected]: (state) => {
      state.eventDetail = {}
      state.status = false
    },

    //Fetch Search Events
    [fetchSearchEventsAsync.pending]: (state) => {
      state.status = true
    },
    [fetchSearchEventsAsync.fulfilled]: (state, action) => {
      state.events = action.payload
      state.status = false
    },
    [fetchSearchEventsAsync.rejected]: (state) => {
      state.events = []
      state.status = false
    },
  },
})

export default eventsSlice.reducer
