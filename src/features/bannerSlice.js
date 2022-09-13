import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  banners: [],
  error: "",
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    getBannersRequest: (state) => {
      state.loading = true;
    },
    getBannersSuccess: (state, action) => {
      state.loading = false;
      state.banners = action.payload;
      state.error = "";
    },
    getBannersFailure: (state, action) => {
      state.loading = false;
      state.banners = [];
      state.error = action.payload;
    },
    deleteBannersRequest: (state) => {
      state.loading = true;
    },
    deleteBannersSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.banners = state.banners.filter(
        (banner) => action.payload !== banner.id
      );
    },
    deleteBannersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBannerImegeUrlRequest: (state) => {
      state.loading = true;
    },
    updateBannerImegeUrlSuccess: (state, action) => {
      state.loading = false;
      state.banners = state.banners.map((banner) =>
        banner.id.toString() === action.payload.banner_id
          ? { ...banner, image_url: action.payload.image_url }
          : banner
      );
      state.error = "";
    },
    updateBannerImegeUrlFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBannerLiveStatusRequest: (state) => {
      state.loading = true;
    },
    updateBannerLiveStatusSuccess: (state, action) => {
      state.loading = false;
      state.banners = state.banners.map((banner) =>
        banner.id.toString() === action.payload.banner_id
          ? { ...banner, is_active: action.payload.is_active }
          : banner
      );
      state.error = "";
    },
    updateBannerLiveStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getBannersFailure,
  getBannersRequest,
  getBannersSuccess,
  deleteBannersFailure,
  deleteBannersRequest,
  deleteBannersSuccess,
  updateBannerImegeUrlFailure,
  updateBannerImegeUrlRequest,
  updateBannerImegeUrlSuccess,
  updateBannerLiveStatusFailure,
  updateBannerLiveStatusRequest,
  updateBannerLiveStatusSuccess,
} = bannerSlice.actions;

export default bannerSlice.reducer;
