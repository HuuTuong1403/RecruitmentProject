import axiosClient from 'api/axiosClient'

// #region API for Employer
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
// #endregion

// #region API for Job Posting
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
// #endregion

// #region API for statistic dashboard
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
// #endregion

// #region API for Service Package
export const getAllServicePackage = async () => {
  try {
    const res = await axiosClient.get('service-package')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const createServicePackage = async (payload) => {
  try {
    const res = await axiosClient.post('system-manager/service-package', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getByIdServicePackage = async (payload) => {
  try {
    const res = await axiosClient.get(`service-package/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const updateServicePackage = async (id, data) => {
  try {
    const res = await axiosClient.patch(`system-manager/service-package/${id}`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const softDeleteServicePackage = async (payload) => {
  try {
    const res = await axiosClient.delete(`system-manager/service-package/soft-delete/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const restoreServicePackage = async (payload) => {
  try {
    const res = await axiosClient.patch(`system-manager/service-package/restore/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const hardDeleteServicePackage = async (payload) => {
  try {
    const res = axiosClient.delete(`system-manager/service-package/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAllServicePackageDeleted = async () => {
  try {
    const res = await axiosClient.get('system-manager/service-package/soft-delete/trash')
    return res
  } catch (error) {
    console.log(error)
  }
}
// #endregion

// #region API for Service
export const getAllService = async () => {
  try {
    const res = await axiosClient.get('system-manager/service')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const createService = async (payload) => {
  try {
    const res = await axiosClient.post('system-manager/service', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const updateService = async (id, data) => {
  try {
    const res = await axiosClient.patch(`system-manager/service/${id}`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const softDeleteService = async (payload) => {
  try {
    const res = await axiosClient.delete(`system-manager/service/soft-delete/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const restoreService = async (payload) => {
  try {
    const res = await axiosClient.patch(`system-manager/service/restore/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const hardDeleteService = async (payload) => {
  try {
    const res = await axiosClient.delete(`system-manager/service/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAllDeletedService = async (payload) => {
  try {
    const res = await axiosClient.get('system-manager/service/soft-delete/trash')
    return res
  } catch (error) {
    console.log(error)
  }
}
// #endregion
