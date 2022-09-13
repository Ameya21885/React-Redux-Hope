import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  universities: [],
  error: "",
};

export const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {
    getUniversitiesRequest: (state) => {
      state.loading = true;
    },
    getUniversitiesSuccess: (state, action) => {
      state.loading = false;
      state.universities = action.payload;
      state.error = "";
    },
    getUniversitiesFailure: (state, action) => {
      state.loading = false;
      state.universities = [];
      state.error = action.payload;
    },
    addUniversityRequest: (state) => {
      state.loading = true;
    },
    addUniversitySuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.universities = [...state.universities, action.payload];
    },
    addUniversityFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUniversityRequest: (state) => {
      state.loading = true;
    },
    deleteUniversitySuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.universities = state.universities.filter(
        (university) => action.payload !== university.id
      );
    },
    deleteUniversityFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUniversityNameRequest: (state) => {
      state.loading = true;
    },
    updateUniversityNameSuccess: (state, action) => {
      state.loading = false;
      state.universities = state.universities.map((university) =>
        university.id.toString() === action.payload.university_id
          ? { ...university, university_name: action.payload.university_name }
          : university
      );
      state.error = "";
    },
    updateUniversityNameFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateUniversityLiveStatusRequest: (state) => {
      state.loading = true;
    },
    updateUniversityLiveStatusSuccess: (state, action) => {
      state.loading = false;
      state.universities = state.universities.map((university) =>
        university.id.toString() === action.payload.university_id
          ? { ...university, is_active: action.payload.is_active }
          : university
      );
      state.error = "";
    },
    updateUniversityLiveStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUniversitiesFailure,
  getUniversitiesRequest,
  getUniversitiesSuccess,
  addUniversityFailure,
  addUniversityRequest,
  addUniversitySuccess,
  deleteUniversityFailure,
  deleteUniversityRequest,
  deleteUniversitySuccess,
  updateUniversityLiveStatusFailure,
  updateUniversityLiveStatusRequest,
  updateUniversityLiveStatusSuccess,
  updateUniversityNameFailure,
  updateUniversityNameRequest,
  updateUniversityNameSuccess,
} = universitySlice.actions;

export default universitySlice.reducer;
