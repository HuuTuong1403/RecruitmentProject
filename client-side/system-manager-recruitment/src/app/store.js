import { configureStore } from '@reduxjs/toolkit'
import systemManagementReducer from 'features/SystemManager/slices'
import systemManageReducer from 'features/Auth/slices'

const store = configureStore({
  reducer: {
    systemMange: systemManageReducer,
    systemManagement: systemManagementReducer,
  },
})

export default store
