import { createSlice } from '@reduxjs/toolkit'
import { signInAuthAsync } from './thunks'

const initialState = {
  systemManage: null,
  status: false,
}

export const systemManageSlice = createSlice({
  name: 'systemManage',
  initialState,
  reducers: {
    logoutHandler: (state) => {
      state.systemManage = null
      localStorage.removeItem('token')
      localStorage.removeItem('systemManage')
    },
  },
  extraReducers: {
    [signInAuthAsync.pending]: (state) => {
      state.status = true
      state.systemManage = null
    },
    [signInAuthAsync.fulfilled]: (state, action) => {
      const { token, data } = action.payload
      state.status = false
      if (token && data) {
        state.systemManage = data.systemManager
        localStorage.setItem('token', token)
        localStorage.setItem('systemManage', JSON.stringify(state.systemManage))
      } else {
        state.systemManage = null
      }
    },
    [signInAuthAsync.rejected]: (state) => {
      state.status = false
      state.systemManage = null
    },
  },
})

export const { logoutHandler } = systemManageSlice.actions
export default systemManageSlice.reducer
