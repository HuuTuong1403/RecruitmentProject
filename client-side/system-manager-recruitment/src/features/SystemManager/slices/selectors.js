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
