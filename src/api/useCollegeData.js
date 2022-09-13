import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addCollegeFailure,
  addCollegeRequest,
  addCollegeSuccess,
  deleteCollegeFailure,
  deleteCollegeRequest,
  deleteCollegeSuccess,
  getCollegesFailure,
  getCollegesRequest,
  getCollegesSuccess,
  updateCollegeLiveStatusFailure,
  updateCollegeLiveStatusSuccess,
  updateCollegeNameFailure,
  updateCollegeNameRequest,
  updateCollegeNameSuccess,
  updateCollegeUniversityFailure,
  updateCollegeUniversityRequest,
  updateCollegeUniversitySuccess,
} from "../features/collegeSlice";

function useCollegeData() {
  const BASE_URL = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();

  const addNewConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
    },
  };

  const getColleges = () => {
    dispatch(getCollegesRequest());
    axios
      .get(`${BASE_URL}/findCollege/0`)
      .then((res) => {
        const colleges = res.data.data;
        dispatch(getCollegesSuccess(colleges));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getCollegesFailure(errorMsg));
      });
  };

  const addCollege = (college) => {
    dispatch(addCollegeRequest());
    axios
      .post(`${BASE_URL}/addCollege?token=CSADMIN`, college, addNewConfig)
      .then((res) => {
        const newCollege = res.data.data;
        dispatch(addCollegeSuccess(newCollege));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(addCollegeFailure(errorMsg));
      });
  };

  const deleteCollege = (college) => {
    dispatch(deleteCollegeRequest());
    axios
      .delete(`${BASE_URL}/deleteCollege`, {
        data: college,
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(deleteCollegeSuccess(college.college_id));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(deleteCollegeFailure(errorMsg));
      });
  };

  const updateCollegeName = (college) => {
    dispatch(updateCollegeNameRequest());
    axios
      .put(`${BASE_URL}/updateCollegeName`, college, addNewConfig)
      .then((res) => {
        dispatch(updateCollegeNameSuccess(college));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(updateCollegeNameFailure(errorMsg));
      });
  };

  const updateCollegeUniversity = (college) => {
    // dispatch(updateCollegeUniversityRequest)
    axios
      .put(`${BASE_URL}/updateCollegeUniversity`, college, addNewConfig)
      .then((res) => {
        dispatch(updateCollegeUniversitySuccess(college));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(updateCollegeUniversityFailure(errorMsg));
      });
  };

  const updateCollegeLiveStatus = (college) => {
    dispatch(updateCollegeUniversityRequest);
    axios
      .put(`${BASE_URL}/CollegeLiveStatus`, college)
      .then(() => {
        dispatch(updateCollegeLiveStatusSuccess(college));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(updateCollegeLiveStatusFailure(errorMsg));
      });
  };

  return {
    getColleges,
    addCollege,
    deleteCollege,
    updateCollegeName,
    updateCollegeUniversity,
    updateCollegeLiveStatus,
  };
}

export default useCollegeData;
