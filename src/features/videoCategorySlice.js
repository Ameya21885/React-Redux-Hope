import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  videoCategories: [],
  error: "",
};

export const videoCategorySlice = createSlice({
  name: "videoCategory",
  initialState,
  reducers: {
    getVideoCategoriesRequest: (state) => {
      state.loading = true;
    },
    getVideoCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.videoCategories = action.payload;
      state.error = "";
    },
    getVideoCategoriesFailure: (state, action) => {
      state.loading = false;
      state.videoCategories = [];
      state.error = action.payload;
    },
    addVideoCategoryRequest: (state) => {
      state.loading = true;
    },
    addVideoCategorySuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.videoCategories = [...state.videoCategories, action.payload];
    },
    addVideoCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getVideoCategoriesFailure,getVideoCategoriesRequest,getVideoCategoriesSuccess,addVideoCategoryFailure,addVideoCategoryRequest,addVideoCategorySuccess
} = videoCategorySlice.actions;

export default videoCategorySlice.reducer;
