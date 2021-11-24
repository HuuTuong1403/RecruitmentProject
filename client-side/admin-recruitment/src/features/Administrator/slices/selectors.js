export const selectAdminLocal = () => {
  return JSON.parse(localStorage.getItem('admin'))
}

export const selectAdminDetail = (state) => {
  return state?.admin?.adminDetail
}
