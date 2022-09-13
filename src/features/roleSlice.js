import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  // Get 
  roles: [],
  role:[],
  options: [],
  // Add 
  addOptionName: "",
  addoptionId: null,
  // Error 
  error: "",
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    getAllRolesRequest: (state) => {
      state.loading = true;
    },
    getAllRolesSuccess: (state, action) => {
      state.loading = false;
      state.roles = action.payload;
      state.error = "";
    },
    getAllRolesFailure: (state, action) => {
      state.loading = false;
      state.roles = [];
      state.error = action.payload;
    },

    getRoleRequest: (state) => {
      state.loading = true;
    },
    getRoleSuccess: (state, action) => {
      state.loading = false;
      state.role = action.payload;
      state.error = "";
    },
    getRoleFailure: (state, action) => {
      state.loading = false;
      state.role = [];
      state.error = action.payload;
    },

    getOptionsRequest: (state) => {
      state.loading = true;
    },
    getOptionsSuccess: (state, action) => {
      state.loading = false;
      state.options = action.payload;
      state.error = "";
    },
    getOptionsFailure: (state, action) => {
      state.loading = false;
      state.options = [];
      state.error = action.payload;
    },
    addRoleRequest: (state) => {
      state.loading = true;
    },
    addRoleSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.roles = [...state.roles, action.payload];
    },
    addRoleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addRoleOptionRequest: (state) => {
      state.loading = true;
    },
    addRoleOptionSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.addOptionName = action.payload.newRoleOptionName;
      state.addoptionId = action.payload.newRoleOptionId
    },
    addRoleOptionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addRoleSubOptionRequest: (state) => {
      state.loading = true;
    },
    addRoleSubOptionSuccess: (state) => {
      state.loading = false;
      state.error = "";
    },
    addRoleSubOptionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteRoleRequest: (state) => {
      state.loading = true;
    },
    deleteRoleSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.roles = state.roles.filter((role) => action.payload !== role.id);
    },
    deleteRoleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateRoleRequest: (state) => {
      state.loading = true;
    },
    updateRoleSuccess: (state, action) => {
      state.loading = false;
      state.roles = state.roles.map((role) =>
        role.id.toString() === action.payload.role_id
          ? { ...role, user_role: action.payload.user_role }
          : role
      );
      state.error = "";
    },
    updateRoleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllRolesFailure,
  getAllRolesRequest,
  getAllRolesSuccess,

  getRoleFailure,
  getRoleRequest,
  getRoleSuccess,

  addRoleFailure,
  addRoleRequest,
  addRoleSuccess,

  addRoleOptionFailure,
  addRoleOptionRequest,
  addRoleOptionSuccess,

  addRoleSubOptionFailure,
  addRoleSubOptionRequest,
  addRoleSubOptionSuccess,

  deleteRoleFailure,
  deleteRoleRequest,
  deleteRoleSuccess,

  updateRoleFailure,
  updateRoleRequest,
  updateRoleSuccess,

  getOptionsFailure,
  getOptionsRequest,
  getOptionsSuccess
} = roleSlice.actions;

export default roleSlice.reducer;
