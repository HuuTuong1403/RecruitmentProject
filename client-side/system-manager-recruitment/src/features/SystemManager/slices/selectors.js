export const selectSystemManageLocal = () => {
  return JSON.parse(localStorage.getItem("systemManage"));
};
