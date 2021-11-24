import axiosClient from 'api/axiosClient'

export const fetchAlLEmployer = async () => {
  try {
    const res = await axiosClient.get('system-manager/manage/employer')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchEmployerDetail = async (payload) => {
  try {
    const res = await axiosClient.get(`system-manager/manage/employer/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const issueAccountEmployer = async (payload) => {
  try {
    const { id, username, password } = payload
    const res = await axiosClient.patch(`system-manager/manage/employer/${id}/issue`, {
      username,
      password,
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getSystemManagerDetail = async () => {
  try {
    const res = await axiosClient.get('system-manager')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const updatePasswordSystemManager = async (payload) => {
  try {
    const res = axiosClient.patch('system-manager/updatePassword', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const upadteProfileSystemManager = async (payload) => {
  try {
    const res = await axiosClient.patch('system-manager/updateMe', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchAllJob = async () => {
  try {
    const res = await axiosClient.get('system-manager/jobs/view/all')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchAllJobDeleted = async () => {
  try {
    const res = await axiosClient.get('system-manager/jobs/soft-delete/trash')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const approveJobPosting = async (payload) => {
  try {
    const res = await axiosClient.patch(`system-manager/jobs/${payload}/approve`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const denyJobPosting = async (payload) => {
  try {
    const res = await axiosClient.patch(`system-manager/jobs/${payload}/deny`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchSumJobSeeker = async () => {
  try {
    const res = await axiosClient.get('system-manager/job-seeker/statistic/jobseeker-comp')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchSumEmployer = async () => {
  try {
    const res = await axiosClient.get('system-manager/employer/statistic/employer-comp')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchJobSeekerStatisticMonthly = async () => {
  try {
    const res = await axiosClient.get('system-manager/job-seeker/statistic/jobseeker-stat')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchEmployerStatisticMonthly = async () => {
  try {
    const res = await axiosClient.get('system-manager/employer/statistic/employer-stat')
    return res
  } catch (error) {
    console.log(error)
  }
}
