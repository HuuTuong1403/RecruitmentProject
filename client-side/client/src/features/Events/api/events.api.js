import axiosClient from 'api/axiosClient'

export const fetcAllEvents = async () => {
  try {
    const res = await axiosClient.get('events')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchDetailEvent = async (payload) => {
  try {
    const res = await axiosClient.get(`events/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchSearchEvents = async (payload) => {
  try {
    const res = await axiosClient.get('events', {
      params: payload['filter'],
    })
    return res
  } catch (error) {
    console.log(error)
  }
}
