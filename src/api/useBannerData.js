import axios from "axios";
import { useDispatch } from "react-redux";
import {
  getBannersFailure,
  getBannersRequest,
  getBannersSuccess,
  updateBannerImegeUrlFailure,
  updateBannerImegeUrlRequest,
  updateBannerImegeUrlSuccess,
  updateBannerLiveStatusFailure,
  updateBannerLiveStatusRequest,
  updateBannerLiveStatusSuccess,
} from "../features/bannerSlice";

function useBannerData() {
  const dispatch = useDispatch();

  const BASE_URL = process.env.REACT_APP_API_URL;

  const deleteConfig = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  const getBanners = () => {
    dispatch(getBannersRequest());
    axios
      .get(`${BASE_URL}/banners`)
      .then((res) => {
        
        const banners = res.data.data;
        dispatch(getBannersSuccess(banners));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getBannersFailure(errorMsg));
      });
  };

  const updateBannerLiveStatus = (banner) => {
    dispatch(updateBannerLiveStatusRequest);
    axios
      .put(`${BASE_URL}/bannerLiveStatus`, banner)
      .then(() => {
        dispatch(updateBannerLiveStatusSuccess(banner));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(updateBannerLiveStatusFailure(errorMsg));
      });
  };

  const updateBannerImageUrl = (banner) => {
    dispatch(updateBannerImegeUrlRequest);
    axios
      .put(`${BASE_URL}/updateBannerImageURL`, banner, deleteConfig)
      .then(() => {
        dispatch(updateBannerImegeUrlSuccess(banner));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(updateBannerImegeUrlFailure(errorMsg));
      });
  };

  return { getBanners, updateBannerLiveStatus, updateBannerImageUrl };
}

export default useBannerData;
