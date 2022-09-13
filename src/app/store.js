import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import categoryReducer from '../features/categorySlice'
import bannerReducer from '../features/bannerSlice'
import universityReducer from '../features/universitySlice'
import collegeReducer from '../features/collegeSlice'
import courseReducer from '../features/courseSlice'
import yearReducer from '../features/yearSlice'
import notificationReducer from '../features/notificationSlice'
import streamReducer from '../features/streamSlice'
import subuserReducer from '../features/subuserSlice'
import videoReducer from '../features/videoSlice'
import videoCategoryReducer from '../features/videoCategorySlice'
import roleReducer from '../features/roleSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    subuser: subuserReducer,
    role : roleReducer,
    category: categoryReducer,
    banner: bannerReducer,
    university: universityReducer,
    college: collegeReducer,
    course: courseReducer,
    year: yearReducer,
    notification: notificationReducer,
    stream: streamReducer,
    video: videoReducer,
    videoCategory: videoCategoryReducer
  },
});
