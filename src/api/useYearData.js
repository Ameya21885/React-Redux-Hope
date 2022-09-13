import axios from "axios";
import { useDispatch } from "react-redux"
import { addYearFailure, addYearRequest, addYearSuccess, deleteYearFailure, deleteYearRequest, deleteYearSuccess, getYearsFailure, getYearsRequest, getYearsSuccess, updateYearLiveStatusFailure, updateYearLiveStatusRequest, updateYearLiveStatusSuccess, updateYearNameFailure, updateYearNameRequest, updateYearNameSuccess, updateYearSequenceFailure, updateYearSequenceRequest, updateYearSequenceSuccess } from "../features/yearSlice";

function useYearData() {
    const BASE_URL = process.env.REACT_APP_API_URL

    const addNewConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const dispatch = useDispatch();

    const getYears = () => {
            dispatch(getYearsRequest())
            axios.get(`${BASE_URL}/findYear/0`)
                .then(res => {
                    const years = res.data.data
                    dispatch(getYearsSuccess(years))
    
                })
                .catch(error => {
                    const errorMsg = error.message
                    dispatch(getYearsFailure(errorMsg))
                })
    
    }
    
    const addYear = (year) => {
            dispatch(addYearRequest)
            axios.post(`${BASE_URL}/addYear?token=CSADMIN`, year, addNewConfig)
                .then(res => {
                    const newYear = res.data.data
                    dispatch(addYearSuccess(newYear))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(addYearFailure(errorMsg))
                })
    }
    
    const deleteYear = (year) => {
            dispatch(deleteYearRequest())
            axios.delete(`${BASE_URL}/deleteYears`, {
    
                data: year,
                headers: {
                    authorization: localStorage.getItem('token'),
    
                }
            })
                .then(res => {
                    dispatch(deleteYearSuccess(year.year_id))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(deleteYearFailure(errorMsg))
                })
    
    }
    
    const updateYearName = (year) => {
    
            dispatch(updateYearNameRequest())
            axios.put(`${BASE_URL}/updateYearName`, year, addNewConfig)
                .then(res => {
                    dispatch(updateYearNameSuccess(year))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(updateYearNameFailure(errorMsg))
                })
    }
    
    const updateYearSequence = (year) => {
    
            dispatch(updateYearSequenceRequest)
            axios.put(`${BASE_URL}/updateYearSequence`, year, addNewConfig)
                .then(res => {
                    dispatch(updateYearSequenceSuccess(year))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(updateYearSequenceFailure(errorMsg))
                })
    }
    
    const updateYearLiveStatus = (year) => {
            dispatch(updateYearLiveStatusRequest())
            axios.put(`${BASE_URL}/YearLiveStatus`, year, addNewConfig)
                .then(res => {
                    dispatch(updateYearLiveStatusSuccess(year))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(updateYearLiveStatusFailure(errorMsg))
                })
        }
        return {getYears, addYear,updateYearName,deleteYear,updateYearSequence,updateYearLiveStatus}
}

export default useYearData