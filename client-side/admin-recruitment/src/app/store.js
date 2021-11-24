import { configureStore } from '@reduxjs/toolkit'
import adminAuthReducer from 'features/Auth/slices'
import adminReducer from 'features/Administrator/slices'

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    admin: adminReducer,
  },
})

export default store
