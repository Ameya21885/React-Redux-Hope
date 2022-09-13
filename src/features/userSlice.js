import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isLoggedIn: localStorage.getItem("token") ? true : false,
  user: JSON.parse(localStorage.getItem("user")) || {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
      state.isLoggedIn = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = {};
    },
    addUserRequest: (state) => {
      state.loading = true;
    },
    addUserSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.user = [...state.user, action.payload];
    },
    addUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  addUserFailure,
  addUserRequest,
  addUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
