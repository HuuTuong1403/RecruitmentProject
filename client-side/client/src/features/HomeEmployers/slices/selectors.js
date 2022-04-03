export const selectInfoSignUp = (state) => {
  return state?.authEmployer?.signUpInformation
}

export const selectServicePackages = (state) => {
  return state?.authEmployer?.servicePackages
}

export const selectStatus = (state) => {
  return state?.authEmployer?.status
}
