import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDetailEmployer } from "../api/employer.api";

export const getDetailEmployerAsync = createAsyncThunk(
  "employer/getDetailEmployer",
  async () => {
    const res = await getDetailEmployer();
    return res.data.data;
  }
);
