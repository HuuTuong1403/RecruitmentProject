import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetcAllEvents,
  fetchDetailEvent,
  fetchSearchEvents,
} from "../api/events.api";

export const fetcAllEventsAsync = createAsyncThunk(
  "events/fetcAllEvents",
  async () => {
    const res = await fetcAllEvents();
    return res.data.data;
  }
);

export const fetchDetailEventAsync = createAsyncThunk(
  "events/fetchDetailEvent",
  async (payload) => {
    const res = await fetchDetailEvent(payload);
    return res.data.data;
  }
);

export const fetchSearchEventsAsync = createAsyncThunk(
  "events/fetchSearchEvents",
  async (payload) => {
    const res = await fetchSearchEvents(payload);
    return res.data.data;
  }
);
