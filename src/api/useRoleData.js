import axios from "axios";
import { useDispatch } from "react-redux";
import {
  getAllRolesFailure,
  getAllRolesRequest,
  getAllRolesSuccess,
  addRoleFailure,
  addRoleRequest,
  addRoleSuccess,
  getOptionsRequest,
  getOptionsSuccess,
  getOptionsFailure,
  getRoleRequest,
  getRoleSuccess,
  getRoleFailure,
  addRoleOptionRequest,
  addRoleOptionSuccess,
  addRoleOptionFailure,
  addRoleSubOptionRequest,
} from "../features/roleSlice";

function useRoleData() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const addNewConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getAllRoles = () => {
    dispatch(getAllRolesRequest());
    axios
      .get(`${BASE_URL}/getAllRoles`)
      .then((res) => {
        const roles = res.data.data;
        dispatch(getAllRolesSuccess(roles));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getAllRolesFailure(errorMsg));
      });
  };

  const getRole = (roleId) => {
    dispatch(getRoleRequest());
    axios
      .get(`${BASE_URL}/getRole/${roleId}`)
      .then((res) => {
        const role = res.data.data;
        dispatch(getRoleSuccess(role));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getRoleFailure(errorMsg));
      });
  };

  const getOptions = () => {
    dispatch(getOptionsRequest());
    axios
      .get(`${BASE_URL}/getRoleOptions`)
      .then((res) => {
        const options = res.data.data;
        dispatch(getOptionsSuccess(options));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getOptionsFailure(errorMsg));
      });
  };

  const addRole = (role) => {
    dispatch(addRoleRequest());
    axios
      .post(`${BASE_URL}/addRoleOption`, role, addNewConfig)
      .then((res) => {
        const newRole = res.data.data;
        dispatch(addRoleSuccess(newRole));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(addRoleFailure(errorMsg));
      });
  };

  const addRoleOption = (roleOptionsName) => {
    dispatch(addRoleOptionRequest());
   let addRolePromise = axios
      .post(`${BASE_URL}/addRoleOption`,  { role_options_name: roleOptionsName
    } , addNewConfig)
      .then((res) => {
        const newRoleOptionName = res.data.data.role_options_name;
        const newRoleOptionId = res.data.data.id
        dispatch(addRoleOptionSuccess({newRoleOptionName,newRoleOptionId}));
        return newRoleOptionId
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(addRoleOptionFailure(errorMsg));
      });
      return addRolePromise
  };

  const addRoleSubOption = ({roleOptionId,roleSubOptionNames}) => {
    dispatch(addRoleSubOptionRequest());
    axios
      .post(`${BASE_URL}/addRoleSubOption`,{
        role_options_id: roleOptionId,
        role_sub_option_name: roleSubOptionNames
      }  , addNewConfig)
      .then((res) => {
        const newSubOption = res.data.data;
        dispatch(addRoleSubOptionRequest(newSubOption));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(addRoleSubOptionRequest(errorMsg));
      });
  };

  return {
    getAllRoles,
    getRole,
    getOptions,
    addRole,
    addRoleOption,
    addRoleSubOption
  };
}

export default useRoleData;
