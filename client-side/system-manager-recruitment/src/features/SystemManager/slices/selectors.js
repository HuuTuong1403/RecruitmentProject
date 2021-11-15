export const selectSystemManageLocal = () => {
  return JSON.parse(localStorage.getItem("systemManage"));
};

export const selectEmployers = (state) => {
  return state?.systemManagement?.employers;
};

export const selectStatus = (state) => {
  return state?.systemManagement?.status;
};

export const selectEmployer = (state) => {
  return state?.systemManagement?.employer;
};

export const selectSystemManageDetail = (state) => {
  return state?.systemManagement?.systemManager;
};

export const selectAllJobs = (state) => {
  return state?.systemManagement?.jobs;
};

export const selectTabsItem = (state) => {
  return state?.systemManagement?.tabItem;
};
