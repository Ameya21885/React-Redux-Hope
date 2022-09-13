import axios from "axios";
import { useDispatch } from "react-redux";
import {
  getSubusersFailure,
  getSubusersRequest,
  getSubusersSuccess,
  addSubuserFailure,
  addSubuserRequest,
  addSubuserSuccess,
  deleteSubuserFailure,
  deleteSubuserRequest,
  deleteSubuserSuccess,
  updateSubuserRoleRequest,
  updateSubuserRoleSuccess,
  updateSubuserRoleFailure,
  updateSubuserLiveStatusFailure,
  updateSubuserLiveStatusSuccess,
  updateSubuserLiveStatusRequest,
} from "../features/subuserSlice";
function useSubuserData() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const addNewConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getSubusers = () => {
    dispatch(getSubusersRequest());
    axios
      .get(`${BASE_URL}/getProfileBasedUser`, { user_role: 1, is_active: 1 })
      .then((res) => {
        const users = res.data.data;
        dispatch(getSubusersSuccess(users));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getSubusersFailure(errorMsg));
      });
  };

  const addSubuser = (subuser) => {
    dispatch(addSubuserRequest());
    axios
      .post(`${BASE_URL}/addSubAdmin?token=CSADMIN`, subuser, addNewConfig)
      .then((res) => {
        console.log(res);
        const newSubuser = res.data.data;
        dispatch(
          addSubuserSuccess({
            msg: res.data.msg,
            data: newSubuser,
            status: res.status,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          addSubuserFailure({ msg: err.message, status: err.response.status })
        );
      });
  };

  const deleteSubuser = (subuser) => {
    dispatch(deleteSubuserRequest());
    axios
      .delete(`${BASE_URL}/deleteUser`, {
        data: subuser,
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //
        console.log(res);
        dispatch(
          deleteSubuserSuccess({
            msg: res.data.msg,
            status: res.status,
            data: subuser.user_id,
          })
        );
      })
      .catch((err) => {
        console.log({ msg: err.data.msg, status: err.status });

        //
        dispatch(
          deleteSubuserFailure({ msg: err.message, status: err.response.status })
        );
      });
  };

  const updateSubuserRole = (user) => {
    dispatch(updateSubuserRoleRequest());
    axios
      .put(`${BASE_URL}/updateUserRole`, user)
      .then((res) => {
        dispatch(updateSubuserRoleSuccess(user));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(updateSubuserRoleFailure(errorMsg));
      });
  };

  const updateSubuserLiveStatus = (user) => {
    dispatch(updateSubuserLiveStatusRequest());
    axios
      .put(`${BASE_URL}/userLiveStatus`, user)
      .then((res) => {
        dispatch(updateSubuserLiveStatusSuccess(user));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(updateSubuserLiveStatusFailure(errorMsg));
      });
  };

  return {
    getSubusers,
    addSubuser,
    deleteSubuser,
    updateSubuserLiveStatus,
    updateSubuserRole,
  };
}

export default useSubuserData;
