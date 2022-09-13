import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  years: [],
  error: "",
};

export const yearSlice = createSlice({
  name: "year",
  initialState,
  reducers: {
    getYearsRequest: (state) => {
      state.loading = true;
    },
    getYearsSuccess: (state, action) => {
      state.loading = false;
      state.years = action.payload;
      state.error = "";
    },
    getYearsFailure: (state, action) => {
      state.loading = false;
      state.years = [];
      state.error = action.payload;
    },
    addYearRequest: (state) => {
      state.loading = true;
    },
    addYearSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.years = [...state.years, action.payload];
    },
    addYearFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteYearRequest: (state) => {
      state.loading = true;
    },
    deleteYearSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.years = state.years.filter(
        (year) => action.payload !== year.id.toString()
      );
    },
    deleteYearFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateYearNameRequest: (state) => {
      state.loading = true;
    },
    updateYearNameSuccess: (state, action) => {
      state.loading = false;
      state.years = state.years.map((year) =>
        year.id.toString() === action.payload.year_id
          ? { ...year, year_name: action.payload.year_name }
          : year
      );
      state.error = "";
    },
    updateYearNameFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateYearSequenceRequest: (state) => {
      state.loading = true;
    },
    updateYearSequenceSuccess: (state, action) => {
      state.loading = false;
      state.years = state.years.map((year) =>
        year.id.toString() === action.payload.year_id
          ? { ...year, sequence: action.payload.year_sequence }
          : year
      );
      state.error = "";
    },
    updateYearSequenceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateYearLiveStatusRequest: (state) => {
      state.loading = true;
    },
    updateYearLiveStatusSuccess: (state, action) => {
      state.loading = false;
      state.years = state.years.map((year) =>
        year.id.toString() === action.payload.year_id
          ? { ...year, is_active: action.payload.is_active }
          : year
      );
      state.error = "";
    },
    updateYearLiveStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
getYearsFailure,getYearsRequest,getYearsSuccess,addYearFailure,addYearRequest,addYearSuccess,deleteYearFailure,deleteYearRequest,deleteYearSuccess,updateYearLiveStatusFailure,updateYearLiveStatusRequest,updateYearLiveStatusSuccess,updateYearNameFailure,updateYearNameRequest,updateYearNameSuccess,updateYearSequenceFailure,updateYearSequenceRequest,updateYearSequenceSuccess
} = yearSlice.actions;

export default yearSlice.reducer;
