import axiosClient from "api/axiosClient";

export const getDetailEmployer = async () => {
  try {
    const res = await axiosClient.get("employer");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassEmployer = async (payload) => {
  try {
    const res = await axiosClient.patch("employer/updatePassword", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileEmployer = async (payload) => {
  try {
    const res = await axiosClient.patch("employer/updateMe", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postJobEmployer = async (payload) => {
  try {
    const res = await axiosClient.post("employer/jobs", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobsOfEmployer = async () => {
  try {
    const res = await axiosClient.get(`employer/jobs`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobDetailOfEmployer = async (payload) => {
  try {
    const res = await axiosClient.get(`employer/jobs/${payload}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobDeleted = async () => {
  try {
    const res = await axiosClient.get("employer/jobs/soft-delete/trash");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const softDeleteJob = async (payload) => {
  try {
    const res = await axiosClient.delete(
      `employer/jobs/soft-delete/${payload}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const restoreJob = async (payload) => {
  try {
    const res = await axiosClient.patch(`employer/jobs/restore/${payload}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobsApplicationNotSaved = async (payload) => {
  try {
    const res = await axiosClient.get("employer/applications/management", {
      params: payload["filter"],
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobsApplicationSaved = async (payload) => {
  try {
    const res = await axiosClient.get("employer/applications/management", {
      params: payload["filter"],
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobsApplicationDeleted = async (payload) => {
  try {
    const res = await axiosClient.get("employer/applications/management", {
      params: payload["filter"],
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const saveApplication = async (payload) => {
  try {
    const res = await axiosClient.patch(
      `employer/applications/management/${payload}/save`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteApplication = async (payload) => {
  try {
    const res = await axiosClient.delete(
      `employer/applications/management/${payload}/delete`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const restoreApplication = async (payload) => {
  try {
    const res = await axiosClient.patch(
      `employer/applications/management/${payload}/restore`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
