import axiosClient from 'api/axiosClient'

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

export const fetchJobsApplicationNotSaved = async (payload) => {
  try {
    const res = await axiosClient.get('employer/applications/management', {
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
