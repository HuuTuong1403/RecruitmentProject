import axiosClient from 'api/axiosClient'

export const signUpEmployer = async (payload) => {
  const res = await axiosClient.post('employer', payload)
  return res
}

export const signInEmployer = async (payload) => {
  const res = await axiosClient.post('employer/login', payload)
  return res
}

export const forgotPassEmployer = async (payload) => {
  const res = await axiosClient.post('employer/forgotPassword', payload)
  return res
}

export const resetPassEmployer = async (payload, token) => {
  const res = await axiosClient.patch(`employer/resetPassword/${token}`, payload)
  return res
}
