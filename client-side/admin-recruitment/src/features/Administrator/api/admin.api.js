import axiosClient from 'api/axiosClient'

export const issueAccountManager = async (payload) => {
  try {
    const res = await axiosClient.post('system-admin/manage/system-manager', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const issueAccountAdministrator = async (payload) => {
  try {
    const res = await axiosClient.post('system-admin/account', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const updatePassAdministrator = async (payload) => {
  try {
    const response = await axiosClient.patch('system-admin/updatePassword', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getAdministratorDetail = async () => {
  try {
    const response = await axiosClient.get('system-admin')
    return response
  } catch (error) {
    console.log(error)
  }
}

export const updateProfileAdministrator = async (payload) => {
  try {
    const response = await axiosClient.patch('system-admin/updateMe', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const fetchSumUsers = async () => {
  try {
    const response = await axiosClient.get('system-admin/statistic/user-comp')
    return response
  } catch (error) {
    console.log(error)
  }
}

export const fetchStatisticUsersMonthly = async () => {
  try {
    const response = await axiosClient.get('system-admin/statistic/user-stat')
    return response
  } catch (error) {
    console.log(error)
  }
}
