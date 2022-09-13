import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addCategoriesFailure,
  addCategoriesRequest,
  addCategoriesSuccess,
  getCategoriesFailure,
  getCategoriesRequest,
  getCategoriesSuccess,
} from "../features/categorySlice";

const useCategoryData = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();

  const getCategories = () => {
    dispatch(getCategoriesRequest());
    axios
      .get(`${BASE_URL}/findCategory/0`)
      .then((res) => {
        const categories = res.data.data;
        dispatch(getCategoriesSuccess(categories));
        console.log("got the data")
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getCategoriesFailure(errorMsg));
      });
  };

  const addCategory = (category) => {
    dispatch(addCategoriesRequest());
    axios
      .post(`${BASE_URL}/addCategory?token=CSADMIN`, category)
      .then((res) => {
        const newCategory = res.data.data;
        dispatch(addCategoriesSuccess(newCategory));
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(addCategoriesFailure(errorMsg));
      });
  };

  return { getCategories, addCategory };
};

export default useCategoryData;
