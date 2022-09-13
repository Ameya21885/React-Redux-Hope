import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  streams: [],
  error: "",
};

export const streamSlice = createSlice({
  name: "stream",
  initialState,
  reducers: {
    getStreamsRequest: (state) => {
      state.loading = true;
    },
    getStreamsSuccess: (state, action) => {
      state.loading = false;
      state.streams = action.payload;
      state.error = "";
    },
    getStreamsFailure: (state, action) => {
      state.loading = false;
      state.streams = [];
      state.error = action.payload;
    },
    addStreamRequest: (state) => {
      state.loading = true;
    },
    addStreamSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.streams = [
        ...state.streams,
        {
          ...action.payload,
          course_id: Number(action.payload.course_id),
        },
      ];
    },
    addStreamFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStreamRequest: (state) => {
      state.loading = true;
    },
    deleteStreamSuccess: (state, action) => {
      state.loading = false;
      state.error = "";
      state.streams = state.streams.filter(
        (stream) => action.payload !== stream.id.toString()
      );
    },
    deleteStreamFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStreamNameRequest: (state) => {
      state.loading = true;
    },
    updateStreamNameSuccess: (state, action) => {
      state.loading = false;
      state.streams = state.streams.map((stream) =>
        stream.id.toString() === action.payload.stream_id
          ? { ...stream, stream_name: action.payload.stream_name }
          : stream
      );
      state.error = "";
    },
    updateStreamNameFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStreamCourseRequest: (state) => {
      state.loading = true;
    },
    updateStreamCourseSuccess: (state, action) => {
      state.loading = false;
      state.streams = state.streams.map((stream) =>
        stream.id.toString() === action.payload.stream_id
          ? { ...stream, course_id: Number(action.payload.courses_stream) }
          : stream
      );
      state.error = "";
    },
    updateStreamCourseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStreamLiveStatusRequest: (state) => {
      state.loading = true;
    },
    updateStreamLiveStatusSuccess: (state, action) => {
      state.loading = false;
      state.streams = state.streams.map((stream) =>
        stream.id.toString() === action.payload.stream_id
          ? { ...stream, is_active: action.payload.liveStatusStream }
          : stream
      );
      state.error = "";
    },
    updateStreamLiveStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getStreamsFailure,
  getStreamsRequest,
  getStreamsSuccess,
  addStreamFailure,
  addStreamRequest,
  addStreamSuccess,
  deleteStreamFailure,
  deleteStreamRequest,
  deleteStreamSuccess,
  updateStreamCourseFailure,
  updateStreamCourseRequest,
  updateStreamCourseSuccess,
  updateStreamLiveStatusFailure,
  updateStreamLiveStatusRequest,
  updateStreamLiveStatusSuccess,
  updateStreamNameFailure,
  updateStreamNameRequest,
  updateStreamNameSuccess,
} = streamSlice.actions;

export default streamSlice.reducer;
