import axios from "axios"
import { useDispatch } from "react-redux"
import { addVideoCategoryFailure, addVideoCategoryRequest, addVideoCategorySuccess, getVideoCategoriesFailure, getVideoCategoriesRequest, getVideoCategoriesSuccess } from "../features/videoCategorySlice"

function useVideoCategoryData() {
    const BASE_URL = process.env.REACT_APP_API_URL

    const dispatch = useDispatch()

    const getConfig = {
        headers: {
            'authorization': localStorage.getItem('token'),
            'accept': 'application/json'
    
        }
    }
    
    const deleteConfig = {
        headers: {
            'authorization': localStorage.getItem('token'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const getVideoCategories = () => {
            dispatch(getVideoCategoriesRequest())
            axios.get(`${BASE_URL}/getVideoCatgeory`, getConfig)
                .then(res => {
                    const videos = res.data.data
                    dispatch(getVideoCategoriesSuccess(videos))
    
    
                })
                .catch(error => {
                    const errorMsg = error.message
                    dispatch(getVideoCategoriesFailure(errorMsg))
                })
    
    }
    
    const addVideoCategory = (videoCategory) => {
            dispatch(addVideoCategoryRequest())
            axios.post(`${BASE_URL}/videoCategoryUpload`, videoCategory, deleteConfig)
                .then(res => {
                    const newVideoCategory = res.data.data
                    dispatch(addVideoCategorySuccess(newVideoCategory))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(addVideoCategoryFailure(errorMsg))
                })
    }
    
    return {getVideoCategories,addVideoCategory}
    
}

export default useVideoCategoryData