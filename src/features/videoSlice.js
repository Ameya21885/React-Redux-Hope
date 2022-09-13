import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  videos: [],
  error: "",
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    getVideosRequest: (state) => {
      state.loading = true;
    },
    getVideosSuccess: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
      state.error = "";
    },
    getVideosFailure: (state, action) => {
      state.loading = false;
      state.videos = [];
      state.error = action.payload;
    },
    addVideoRequest: (state) => {
      state.loading = true;
    },
    addVideoSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.videos = [...state.videos, action.payload];
    },
    addVideoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getVideosFailure,
  getVideosRequest,
  getVideosSuccess,
  addVideoFailure,
  addVideoRequest,
  addVideoSuccess,
} = videoSlice.actions;

export default videoSlice.reducer;
