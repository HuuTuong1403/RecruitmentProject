import axiosClient from 'api/axiosClient'

// #region CRUD Employer
export const getDetailEmployer = async () => {
  try {
    const res = await axiosClient.get('employer')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const updatePassEmployer = async (payload) => {
  try {
    const res = await axiosClient.patch('employer/updatePassword', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const updateProfileEmployer = async (payload) => {
  try {
    const res = await axiosClient.patch('employer/updateMe', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}
// #endregion

// #region CRUD Jobs
export const postJobEmployer = async (payload) => {
  try {
    const res = await axiosClient.post('employer/jobs', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchJobsOfEmployer = async () => {
  try {
    const res = await axiosClient.get(`employer/jobs`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchJobDetailOfEmployer = async (payload) => {
  try {
    const res = await axiosClient.get(`employer/jobs/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchJobDeleted = async () => {
  try {
    const res = await axiosClient.get('employer/jobs/soft-delete/trash')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const softDeleteJob = async (payload) => {
  try {
    const res = await axiosClient.delete(`employer/jobs/soft-delete/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const restoreJob = async (payload) => {
  try {
    const res = await axiosClient.patch(`employer/jobs/restore/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const updateJob = async ({ id, data }) => {
  try {
    const res = await axiosClient.patch(`employer/jobs/${id}`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}
// #endregion

// #region CRUD JobsApplication
export const fetchJobsApplicationNotSaved = async (payload) => {
  try {
    const res = await axiosClient.get(`employer/applications/management`, {
      params: payload['filter'],
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchJobsApplicationSaved = async (payload) => {
  try {
    const res = await axiosClient.get('employer/applications/management', {
      params: payload['filter'],
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchJobsApplicationDeleted = async (payload) => {
  try {
    const res = await axiosClient.get('employer/applications/management', {
      params: payload['filter'],
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const saveApplication = async (payload) => {
  try {
    const res = await axiosClient.patch(`employer/applications/management/${payload}/save`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const deleteApplication = async (payload) => {
  try {
    const res = await axiosClient.delete(`employer/applications/management/${payload}/delete`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const restoreApplication = async (payload) => {
  try {
    const res = await axiosClient.patch(`employer/applications/management/${payload}/restore`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const announceApplication = async (payload) => {
  try {
    const res = await axiosClient.post(
      'employer/applications/management/anounce-applicants',
      payload
    )
    return res
  } catch (error) {
    console.log(error)
  }
}

export const countApplicationStatus = async () => {
  try {
    const res = await axiosClient.get('employer/applications/management/status/count')
    return res
  } catch (error) {
    console.log(error)
  }
}
// #endregion

// #region CRUD Event
export const createEventEmployer = async (payload) => {
  try {
    const res = await axiosClient.post('employer/events', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const updateEventEmployer = async (id, data) => {
  try {
    const res = await axiosClient.patch(`employer/events/management/${id}`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchAllEventOfEmployer = async () => {
  try {
    const res = await axiosClient.get('employer/events')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const pauseEventEmployer = async (payload) => {
  try {
    const res = await axiosClient.patch(`employer/events/management/${payload}/pausing`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchEventDetail = async (payload) => {
  try {
    const res = await axiosClient.get(`employer/events/management/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchParticipantsByIdEvent = async (payload) => {
  try {
    const res = await axiosClient.get(`employer/events/${payload}/participants/management/all`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const exportParticipantExcel = async (payload) => {
  try {
    const res = await axiosClient.post('employer/participants/management/export', payload, {
      responseType: 'blob',
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchAllEventDeleted = async () => {
  try {
    const res = await axiosClient('employer/events/management/soft-delete/trash')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const softDeleteEvent = async (payload) => {
  try {
    const res = await axiosClient.delete(`employer/events/management/soft-delete/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const restoreEvent = async (payload) => {
  try {
    const res = await axiosClient.patch(`employer/events/management/restore/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const deleteEvent = async (payload) => {
  try {
    const res = await axiosClient.delete(`employer/events/management/delete/${payload}`)
    return res
  } catch (error) {
    console.log(error)
  }
}
// #endregion

// #region Statistic
export const fetchApplicationStatistic = async () => {
  try {
    const res = await axiosClient.get('employer/applications/statistic/application-stat')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchParticipantStatistic = async () => {
  try {
    const res = await axiosClient.get('employer/participants/statistic/participant-stats')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchApplicationSumStatistic = async () => {
  try {
    const res = await axiosClient.get('employer/applications/statistic/application-comp')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchParticipantSumStatistic = async () => {
  try {
    const res = await axiosClient.get('employer/participants/statistic/participant-comp')
    return res
  } catch (error) {
    console.log(error)
  }
}
// #endregion

// #region CRUD Cart
export const createCart = async (payload) => {
  try {
    const res = await axiosClient.post(`employer/cart/${payload.id}`, payload.data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const fetchCart = async () => {
  try {
    const res = await axiosClient.get('employer/cart')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const updateQuantityServicePackage = async (payload) => {
  try {
    const res = await axiosClient.patch(`employer/cart/${payload.idServicePackage}`, payload.data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const deleteCart = async () => {
  try {
    const res = await axiosClient.delete('employer/cart')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const checkoutCart = async (payload) => {
  try {
    const res = await axiosClient.post('employer/cart/checkout', payload.data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const createPayPal = async (payload) => {
  try {
    const res = await axiosClient.post(`employer/payment/paypal/${payload.id}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const createVnPay = async (payload) => {
  try {
    const res = await axiosClient.post(`employer/payment/vnpay/${payload.id}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAvailableServicePackage = async () => {
  try {
    const res = await axiosClient.get('employer/payment/available')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getOrder = async (payload) => {
  try {
    const res = await axiosClient.get(`employer/payment/${payload.id}`)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}
// #endregion

// #region CRUD Question & answer
export const createQuestion = async (payload) => {
  try {
    const res = await axiosClient.post('question', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAllQuestion = async () => {
  try {
    const res = await axiosClient.get('question')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getQuestionById = async (payload) => {
  try {
    const res = await axiosClient.get(`question/${payload.id}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const updateQuestionById = async (payload) => {
  try {
    const res = await axiosClient.patch(`question/${payload.id}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const softDeleteQuestion = async (payload) => {
  try {
    const res = await axiosClient.delete(`question/soft-delete/${payload.id}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAllQuestioNDeleted = async () => {
  try {
    const res = await axiosClient.get('question/soft-delete/trash')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const restoreQuestion = async (payload) => {
  try {
    const res = await axiosClient.get(`question/restore/${payload.id}`)
    return res
  } catch (error) {
    console.log(error)
  }
}
// #endregion

// #region CRUD Entry Test
export const createEntryTest = async (payload) => {
  try {
    const res = await axiosClient.post('employer/entry-test', payload)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getEntryTestById = async (payload) => {
  try {
    const res = await axiosClient.get(`employer/entry-test/${payload.id}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAllEntryTest = async () => {
  try {
    const res = await axiosClient.get(`employer/entry-test`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const softDeleteEntryTest = async (payload) => {
  try {
    const res = await axiosClient.delete(`employer/entry-test/soft-delete/${payload.id}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const getAllEntryTestDeleted = async () => {
  try {
    const res = await axiosClient.get('employer/entry-test/soft-delete/trash')
    return res
  } catch (error) {
    console.log(error)
  }
}

export const restoreEntryTest = async (payload) => {
  try {
    const res = await axiosClient.patch(`employer/entry-test/soft-delete/trash/${payload.id}`)
    return res
  } catch (error) {
    console.log(error)
  }
}
// #endregion
