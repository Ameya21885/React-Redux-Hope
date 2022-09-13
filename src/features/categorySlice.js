import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  categories: [],
  error: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoriesRequest: (state) => {
      state.loading = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = "";
    },
    getCategoriesFailure: (state, action) => {
      state.loading = false;
      state.categories = [];
      state.error = action.payload;
    },
    addCategoriesRequest: (state) => {
      state.loading = true;
    },
    addCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.categories = [...state.categories, action.payload];
    },
    addCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCategoriesFailure,
  getCategoriesRequest,
  getCategoriesSuccess,
  addCategoriesFailure,
  addCategoriesRequest,
  addCategoriesSuccess,
} = categorySlice.actions;

export default categorySlice.reducer;
