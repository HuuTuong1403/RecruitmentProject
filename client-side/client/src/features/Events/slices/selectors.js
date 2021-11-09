export const selectEvents = (state) => {
  return state?.event?.events;
};

export const selectEventDetail = (state) => {
  return state?.event?.eventDetail;
};

export const selectStatus = (state) => {
  return state?.event?.status;
};