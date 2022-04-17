import axiosClient from 'api/axiosClient'

export const signUpEmployer = async (payload) => {
  try {
    const res = await axiosClient.post('employer', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const signInEmployer = async (payload) => {
  try {
    const res = await axiosClient.post('employer/login', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const forgotPassEmployer = async (payload) => {
  try {
    const res = await axiosClient.post('employer/forgotPassword', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const resetPassEmployer = async (payload, token) => {
  try {
    const res = await axiosClient.patch(`employer/resetPassword/${token}`, payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAllServicePackage = async () => {
  try {
    const res = await axiosClient.get('service-package')
    return res
  } catch (error) {
    console.log(error)
  }
}
