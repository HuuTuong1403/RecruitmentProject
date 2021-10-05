import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDetailJobSeeker } from "../api/jobSeeker.api";

export const getDetailJobSeekerAsync = createAsyncThunk(
  "jobSeeker/getDetailJobSeeker",
  async () => {
    const res = await getDetailJobSeeker();
    return res.data.jobSeeker;
  }
);
