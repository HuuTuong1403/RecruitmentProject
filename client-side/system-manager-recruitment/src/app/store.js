import { configureStore } from "@reduxjs/toolkit";
import systemManageReducer from "features/Auth/slices";
import systemManagementReducer from "features/SystemManager/slices";

const store = configureStore({
  reducer: {
    systemMange: systemManageReducer,
    systemManagement: systemManagementReducer,
  },
});

export default store;
