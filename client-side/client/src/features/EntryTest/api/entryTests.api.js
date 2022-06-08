import axiosClient from 'api/axiosClient'

export const getEntryTestById = async (payload) => {
  try {
    const result = await axiosClient.get(`entry-test/${payload.id}`)
    return result
  } catch (error) {
    console.error(error)
  }
}
