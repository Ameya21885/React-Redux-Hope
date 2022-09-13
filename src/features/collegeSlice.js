import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  colleges: [],
  error: "",
};

export const collegeSlice = createSlice({
  name: "college",
  initialState,
  reducers: {
    getCollegesRequest: (state) => {
      state.loading = true;
    },
    getCollegesSuccess: (state, action) => {
      state.loading = false;
      state.colleges = action.payload;
      state.error = "";
    },
    getCollegesFailure: (state, action) => {
      state.loading = false;
      state.colleges = [];
      state.error = action.payload;
    },
    addCollegeRequest: (state) => {
      state.loading = true;
    },
    addCollegeSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.colleges = [...state.colleges, action.payload];
    },
    addCollegeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCollegeRequest: (state) => {
      state.loading = true;
    },
    deleteCollegeSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.colleges = state.colleges.filter(
        (college) => action.payload !== college.id
      );
    },
    deleteCollegeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCollegeNameRequest: (state) => {
      state.loading = true;
    },
    updateCollegeNameSuccess: (state, action) => {
      state.loading = false;
      state.colleges = state.colleges.map((college) =>
        college.id.toString() === action.payload.college_id
          ? { ...college, college_name: action.payload.college_name }
          : college
      );
      state.error = "";
    },
    updateCollegeNameFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCollegeUniversityRequest: (state) => {
        state.loading = true;
      },
      updateCollegeUniversitySuccess: (state, action) => {
        state.loading = false;
        state.colleges = state.colleges.map((college) =>
          college.id.toString() === action.payload.college_id
            ? { ...college, university_id: action.payload.university_ids }
            : college
        );
        state.error = "";
      },
      updateCollegeUniversityFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    updateCollegeLiveStatusRequest: (state) => {
      state.loading = true;
    },
    updateCollegeLiveStatusSuccess: (state, action) => {
      state.loading = false;
      state.colleges = state.colleges.map((college) =>
        college.id.toString() === action.payload.college_id
          ? { ...college, is_active: action.payload.is_active }
          : college
      );
      state.error = "";
    },
    updateCollegeLiveStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
 getCollegesFailure,getCollegesRequest,getCollegesSuccess,addCollegeFailure,addCollegeRequest,addCollegeSuccess,deleteCollegeFailure,deleteCollegeRequest,deleteCollegeSuccess,updateCollegeLiveStatusFailure,updateCollegeLiveStatusRequest,updateCollegeLiveStatusSuccess,updateCollegeNameFailure,updateCollegeNameRequest,updateCollegeNameSuccess,updateCollegeUniversityFailure,updateCollegeUniversityRequest,updateCollegeUniversitySuccess
} = collegeSlice.actions;

export default collegeSlice.reducer;
