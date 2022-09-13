import axios from "axios";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../features/userSlice";

function useUserData() {
  const loginConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const BASE_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();

  const login = ({ email, password }) => {
    dispatch(loginRequest());
    axios
      .post(`${BASE_URL}/login`, { email, password }, loginConfig)

      .then((res) => {
        const currUser = res.data.user_profile;
        localStorage.setItem("token", res.data.st);
        localStorage.setItem("user", JSON.stringify(res.data.user_profile));
        dispatch(loginSuccess(currUser));
        alert("Welcome To Campus Street");
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(loginFailure(errorMsg));
      });
  };

  return { login };
}

export default useUserData;
