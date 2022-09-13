import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  courses: [],
  error: "",
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    getCoursesRequest: (state) => {
      state.loading = true;
    },
    getCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
      state.error = "";
    },
    getCoursesFailure: (state, action) => {
      state.loading = false;
      state.courses = [];
      state.error = action.payload;
    },
    addCourseRequest: (state) => {
      state.loading = true;
    },
    addCourseSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.courses = [...state.courses, action.payload];
    },
    addCourseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCourseRequest: (state) => {
      state.loading = true;
    },
    deleteCourseSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.courses = state.courses.filter(
        (course) => action.payload !== course.id
      );
    },
    deleteCourseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCourseNameRequest: (state) => {
      state.loading = true;
    },
    updateCourseNameSuccess: (state, action) => {
      state.loading = false;
      state.courses = state.courses.map((course) =>
        course.id.toString() === action.payload.course_id
          ? { ...course, course_name: action.payload.course_name }
          : course
      );
      state.error = "";
    },
    updateCourseNameFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCourseYearRequest: (state) => {
      state.loading = true;
    },
    updateCourseYearSuccess: (state, action) => {
      state.loading = false;
      state.courses = state.courses.map((course) =>
        course.id.toString() === action.payload.course_id
          ? { ...course, year_ids: action.payload.courses_year }
          : course
      );
      state.error = "";
    },
    updateCourseYearFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCourseLiveStatusRequest: (state) => {
      state.loading = true;
    },
    updateCourseLiveStatusSuccess: (state, action) => {
      state.loading = false;
      state.courses = state.courses.map((course) =>
        course.id.toString() === action.payload.course_id
          ? { ...course, is_active: action.payload.is_active }
          : course
      );
      state.error = "";
    },
    updateCourseLiveStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCoursesFailure,
  getCoursesRequest,
  getCoursesSuccess,
  addCourseFailure,
  addCourseRequest,
  addCourseSuccess,
  deleteCourseFailure,
  deleteCourseRequest,
  deleteCourseSuccess,
  updateCourseLiveStatusFailure,
  updateCourseLiveStatusRequest,
  updateCourseLiveStatusSuccess,
  updateCourseNameFailure,
  updateCourseNameRequest,
  updateCourseNameSuccess,
  updateCourseYearFailure,
  updateCourseYearRequest,
  updateCourseYearSuccess,
} = courseSlice.actions;

export default courseSlice.reducer;
