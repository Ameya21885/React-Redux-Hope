import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  notifications: [],
  error: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getNotificationsRequest: (state) => {
      state.loading = true;
    },
    getNotificationsSuccess: (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
      state.error = "";
    },
    getNotificationsFailure: (state, action) => {
      state.loading = false;
      state.notifications = [];
      state.error = action.payload;
    },
    addNotificationRequest: (state) => {
      state.loading = true;
    },
    addNotificationSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.notifications = [...state.notifications, action.payload];
    },
    addNotificationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getNotificationsFailure,
  getNotificationsRequest,
  getNotificationsSuccess,
  addNotificationFailure,
  addNotificationRequest,
  addNotificationSuccess,
} = notificationSlice.actions;

export default notificationSlice.reducer;
