import axiosClient from 'api/axiosClient'

export const signInAuth = async (payload) => {
  const res = await axiosClient.post('system-manager/login', payload)
  return res
}
