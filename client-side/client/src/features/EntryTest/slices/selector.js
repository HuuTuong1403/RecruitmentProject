export const selectStatus = (state) => {
  return state?.entryTest?.status
}

export const selectEntryTest = (state) => {
  return state?.entryTest?.entryTest
}

export const selectAnswerClient = (state) => {
  return state?.entryTest?.answerClient
}

export const selectAnswerContent = (state) => {
  return state?.entryTest?.answerContent
}

export const selectShowModal = (state) => {
  return state?.entryTest?.showModal
}

export const selectTime = (state) => {
  return state?.entryTest?.timneCountDown
}

export const selectAnswerSheet = (state) => {
  return state?.entryTest?.answerSheet
}
