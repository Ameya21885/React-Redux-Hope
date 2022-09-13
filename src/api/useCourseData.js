import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addCourseFailure, addCourseRequest, addCourseSuccess, deleteCourseFailure, deleteCourseRequest, deleteCourseSuccess, getCoursesFailure, getCoursesRequest, getCoursesSuccess, updateCourseLiveStatusFailure, updateCourseLiveStatusRequest, updateCourseLiveStatusSuccess, updateCourseNameFailure, updateCourseNameRequest, updateCourseNameSuccess, updateCourseYearFailure, updateCourseYearSuccess } from '../features/courseSlice'

function useCourseData() {
    const BASE_URL = process.env.REACT_APP_API_URL

    const dispatch = useDispatch()

const addNewConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
}
 
const getCourses = () => {
        dispatch(getCoursesRequest())
        axios.get(`${BASE_URL}/findCourse/0`)
            .then(res => {
                const courses = res.data.data
                dispatch(getCoursesSuccess(courses))

            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(getCoursesFailure(errorMsg))
            })

}

const addCourse = (course) => {
        dispatch(addCourseRequest())
        axios.post(`${BASE_URL}/addCourse?token=CSADMIN`, course, addNewConfig)
            .then(res => {
                const newCourse = res.data.data
                dispatch(addCourseSuccess(newCourse))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(addCourseFailure(errorMsg))
            })
}

const deleteCourse = (course) => {
        dispatch(deleteCourseRequest())
        axios.delete(`${BASE_URL}/deleteCourses`, {

            data: course,
            headers: {
                authorization: localStorage.getItem('token'),

            }
        })
            .then(res => {
                dispatch(deleteCourseSuccess(course.course_id))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(deleteCourseFailure(errorMsg))
            })

}

const updateCourseName = (course) => {
        dispatch(updateCourseNameRequest())
        axios.put(`${BASE_URL}/updateCourseName`, course, addNewConfig)
            .then(res => {
                dispatch(updateCourseNameSuccess(course))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(updateCourseNameFailure(errorMsg))
            })
}

const updateCourseYear = (course) => {
        // dispatch(updateCourseYearRequest)
        axios.put(`${BASE_URL}/updateCoursesYear`, course, addNewConfig)
            .then(res => {
                dispatch(updateCourseYearSuccess(course))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(updateCourseYearFailure(errorMsg))
            })
}

const updateCourseLiveStatus = (course) => {
        dispatch(updateCourseLiveStatusRequest())
        axios.put(`${BASE_URL}/courseLiveStatus`, course, addNewConfig)
            .then(res => {
                dispatch(updateCourseLiveStatusSuccess(course))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(updateCourseLiveStatusFailure(errorMsg))
            })
    }

    return {getCourses, addCourse,deleteCourse,updateCourseName,updateCourseYear,updateCourseLiveStatus}

}

export default useCourseData