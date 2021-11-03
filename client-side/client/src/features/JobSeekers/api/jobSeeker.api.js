import axiosClient from "api/axiosClient";

export const getDetailJobSeeker = async () => {
  try {
    const res = await axiosClient.get(`job-seeker`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassJobSeeker = async (payload) => {
  try {
    const res = await axiosClient.patch("job-seeker/updatePassword", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileJobSeeker = async (payload) => {
  try {
    const res = await axiosClient.patch("job-seeker/updateMe", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addFavoriteJob = async (payload) => {
  try {
    const res = await axiosClient.patch(`job-seeker/favorite-jobs/${payload}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const removeFavoriteJob = async (payload) => {
  try {
    const res = await axiosClient.delete(`job-seeker/favorite-jobs/${payload}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllFavoriteJob = async () => {
  try {
    const res = await axiosClient.get("job-seeker/favorite-jobs/");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const applyJob = async ({ idJob, data }) => {
  try {
    const res = await axiosClient.post(
      `job-seeker/jobs/${idJob}/applications`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllJobApplication = async () => {
  try {
    const res = await axiosClient.get("job-seeker/applications");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createReviewOfCompany = async ({ idCompany, data }) => {
  try {
    const res = await axiosClient.post(`job-seeker/reviews/${idCompany}`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
