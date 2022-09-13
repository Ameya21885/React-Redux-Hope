import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addNotificationFailure,
  addNotificationRequest,
  addNotificationSuccess,
  getNotificationsFailure,
  getNotificationsRequest,
  getNotificationsSuccess,
} from "../features/notificationSlice";

function useNotificationData() {
  const BASE_URL = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();

  // const addNewConfig = {
  //   headers: {
  //     "Content-Type": `multipart/form-data`,
  //   },
  // };
  const getNotifications = () => {
    dispatch(getNotificationsRequest());
    axios
      .get(`${BASE_URL}/getAllNotifications`)
      .then((res) => {
        // console.log(res.data.data)
        const notifications = res.data.data;
        dispatch(getNotificationsSuccess(notifications));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getNotificationsFailure(errorMsg));
      });
  };

  const addNotification = (notification) => {
    dispatch(addNotificationRequest());
    const fd = new FormData();
    fd.append("title", notification.title);
    fd.append("description", notification.description);
    fd.append("university_id", notification.university_id);
    fd.append("college_id", notification.college_id);
    fd.append("image", notification.image);

    axios
      .post(`${BASE_URL}/addNotification`, fd)
      .then((res) => {
        const newNotification = res.data.data;
        
        dispatch(addNotificationSuccess(newNotification));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(addNotificationFailure(errorMsg));
      });
  };

  return { getNotifications, addNotification };
}

export default useNotificationData;
