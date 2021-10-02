import axiosClient from "api/axiosClient";

export const fetchJobs = async () => {
  try {
    const res = await axiosClient.get("jobs");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProvinces = async () => {
  try {
    const res = await axiosClient.get("location/provinces");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDistricts = async ({ code }) => {
  try {
    const res = await axiosClient.get("location/districts", {
      params: { code },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchWards = async ({ code }) => {
  try {
    const res = await axiosClient.get("location/wards", {
      params: { code },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
