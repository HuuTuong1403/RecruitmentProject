import axiosClient from 'api/axiosClient'

export const getEntryTestById = async (payload) => {
  try {
    const result = await axiosClient.get(`entry-test/${payload.id}`)
    return result
  } catch (error) {
    console.error(error)
  }
}

export const createAnswerSheet = async ({ id, data }) => {
  try {
    const result = await axiosClient.post(`entry-test/${id}/answersheets`, data)
    return result
  } catch (error) {
    console.error(error)
  }
}

export const getAnswerSheetById = async ({ idEntryTest, idAnswerSheet }) => {
  try {
    const result = await axiosClient.get(`entry-test/${idEntryTest}/answersheets/${idAnswerSheet}`)
    return result
  } catch (error) {
    console.error(error)
  }
}
