import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  error: "",
  snackError: "",
  status: 1,
  msg: "",
};

export const subuserSlice = createSlice({
  name: "subuser",
  initialState,
  reducers: {
    getSubusersRequest: (state) => {
      state.loading = true;
    },
    getSubusersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    },
    getSubusersFailure: (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
    },
    addSubuserRequest: (state) => {
      state.loading = true;
    },
    addSubuserSuccess: (state, action) => {
      state.loading = false;
      state.snackError = action.payload.msg;
      state.status = action.payload.status;
      state.users = [...state.users, action.payload.data];
    },
    addSubuserFailure: (state, action) => {
      state.loading = false;
      state.snackError = action.payload.msg;
      state.status = action.payload.status;
    },
    deleteSubuserRequest: (state) => {
      state.loading = true;
    },
    deleteSubuserSuccess: (state, action) => {
      state.loading = false;
      state.snackError = action.payload.msg;
      state.status = action.payload.status;
      state.users = state.users.filter(
        (user) => action.payload.data !== user.id
      );
    },
    deleteSubuserFailure: (state, action) => {
      state.loading = false;
      state.snackError = action.payload.msg;
      state.status = action.payload.status;
    },

    updateSubuserRoleRequest: (state) => {
      state.loading = true;
    },
    updateSubuserRoleSuccess: (state, action) => {
      state.loading = false;
      state.users = state.users.map((user) =>
        user.id.toString() === action.payload.user_id
          ? { ...user, user_role: action.payload.user_role }
          : user
      );
      state.error = "";
    },
    updateSubuserRoleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSubuserLiveStatusRequest: (state) => {
      state.loading = true;
    },
    updateSubuserLiveStatusSuccess: (state, action) => {
      state.loading = false;
      state.users = state.users.map((user) =>
        user.id.toString() === action.payload.user_id
          ? { ...user, is_active: action.payload.is_active }
          : user
      );
      state.error = "";
    },
    updateSubuserLiveStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getSubusersFailure,
  getSubusersRequest,
  getSubusersSuccess,
  addSubuserFailure,
  addSubuserRequest,
  addSubuserSuccess,
  deleteSubuserFailure,
  deleteSubuserRequest,
  deleteSubuserSuccess,
  updateSubuserLiveStatusFailure,
  updateSubuserLiveStatusRequest,
  updateSubuserLiveStatusSuccess,
  updateSubuserRoleFailure,
  updateSubuserRoleRequest,
  updateSubuserRoleSuccess,
} = subuserSlice.actions;

export default subuserSlice.reducer;
