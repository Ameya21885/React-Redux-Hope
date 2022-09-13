import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addVideoFailure,
  addVideoRequest,
  addVideoSuccess,
  getVideosFailure,
  getVideosRequest,
  getVideosSuccess,
} from "../features/videoSlice";

function useVideoData() {
  const BASE_URL = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();

  const getConfig = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  const deleteConfig = {
    headers: {
      authorization: localStorage.getItem("token"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const getVideos = (category) => {
    dispatch(getVideosRequest());
    const fd = new FormData();
    fd.append("category_id", category.category_id);
    axios
      .get(
        `${BASE_URL}/getVideos?category_id=${category.category_id}`,
        getConfig
      )
      .then((res) => {
        const videos = res.data.data;
        dispatch(getVideosSuccess(videos));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getVideosFailure(errorMsg));
      });
  };

  const addVideo = (video) => {
    dispatch(addVideoRequest());
    axios
      .post(`${BASE_URL}/videoUpload`, video, deleteConfig)
      .then((res) => {
        const newVideo = res.data.data;
        dispatch(addVideoSuccess(newVideo));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(addVideoFailure(errorMsg));
      });
  };

  return {getVideos,addVideo}
}

export default useVideoData;
