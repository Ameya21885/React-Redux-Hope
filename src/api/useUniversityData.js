import axios from "axios"
import { useDispatch } from "react-redux"
import { addUniversityFailure, addUniversityRequest, addUniversitySuccess, deleteUniversityFailure, deleteUniversityRequest, deleteUniversitySuccess, getUniversitiesFailure, getUniversitiesRequest, getUniversitiesSuccess, updateUniversityLiveStatusFailure, updateUniversityLiveStatusRequest, updateUniversityLiveStatusSuccess, updateUniversityNameFailure, updateUniversityNameRequest, updateUniversityNameSuccess } from "../features/universitySlice"

function useUniversityData() {
    const BASE_URL = process.env.REACT_APP_API_URL
    const dispatch = useDispatch()
  
    const getUniversities = () => {
            dispatch(getUniversitiesRequest())
            axios.get(`${BASE_URL}/findUniversity/0`)
                .then(res => {
                    const universities = res.data.data
                    dispatch(getUniversitiesSuccess(universities))
    
                })
                .catch(error => {
                    const errorMsg = error.message
                    dispatch(getUniversitiesFailure(errorMsg))
                })
    
    }
    
    const addUniversity = (university) => {
            dispatch(addUniversityRequest())
            axios.post(`${BASE_URL}/addUniversity?token=CSADMIN`, university)
                .then(res => {
                    const newUniversity = res.data.data
                    dispatch(addUniversitySuccess(newUniversity))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(addUniversityFailure(errorMsg))
                })
    }
    
    const deleteUniversity = (university) => {
        console.log("uni",university)
            dispatch(deleteUniversityRequest())
            axios.delete(`${BASE_URL}/deleteUniversity`, {
    
                data: university,
                headers: {
                    authorization: localStorage.getItem('token'),
    
                }
            })
                .then(res => {
                    dispatch(deleteUniversitySuccess(university.university_id))
                    console.log(res)
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(deleteUniversityFailure(errorMsg))
                })
    
    }
    
    const updateUniversityName = (university) => {
    
            dispatch(updateUniversityNameRequest())
            axios.put(`${BASE_URL}/updateUniversityName`, university)
                .then(res => {
                    dispatch(updateUniversityNameSuccess(university))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(updateUniversityNameFailure(errorMsg))
                })
    }
    
    const updateUniversityLiveStatus = (university) => {
            dispatch(updateUniversityLiveStatusRequest())
            axios.put(`${BASE_URL}/universityLiveStatus`, university)
                .then(res => {
                    dispatch(updateUniversityLiveStatusSuccess(university))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(updateUniversityLiveStatusFailure(errorMsg))
                })
    }

    return {getUniversities,addUniversity,deleteUniversity,updateUniversityName,updateUniversityLiveStatus}
}

export default useUniversityData