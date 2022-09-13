import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addStreamFailure, addStreamRequest, addStreamSuccess, deleteStreamFailure, deleteStreamRequest, deleteStreamSuccess, getStreamsFailure, getStreamsRequest, getStreamsSuccess, updateStreamCourseFailure, updateStreamCourseSuccess, updateStreamLiveStatusFailure, updateStreamLiveStatusRequest, updateStreamLiveStatusSuccess, updateStreamNameFailure, updateStreamNameRequest, updateStreamNameSuccess } from '../features/streamSlice';

function useStreamData() {

    const BASE_URL = process.env.REACT_APP_API_URL

    const dispatch = useDispatch()

 

    const getStreams = () => {
            dispatch(getStreamsRequest())
            axios.get(`${process.env.REACT_APP_API_URL}/findStream/0`)
                .then(res => {
                    const streams = res.data.data
                    dispatch(getStreamsSuccess(streams))
    
                })
                .catch(error => {
                    const errorMsg = error.message
                    dispatch(getStreamsFailure(errorMsg))
                })
    
    }
    
    const addStream = (stream) => {
            dispatch(addStreamRequest())
            axios.post(`${BASE_URL}/addStream?token=CSADMIN`,stream)
                .then(res => {
                    const newStream = res.data.data
                    dispatch(addStreamSuccess(newStream))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(addStreamFailure(errorMsg))
                })
    }
    
    const deleteStream = (stream) => {
            dispatch(deleteStreamRequest())
            axios.delete(`${BASE_URL}/deleteStreams`, {
    
                data: stream,
                headers: {
                    authorization: localStorage.getItem('token'),
    
                }
            })
                .then(res => {
                    dispatch(deleteStreamSuccess(stream.stream_id))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(deleteStreamFailure(errorMsg))
                })
    
    }
    const updateStreamName = (stream) => {
            dispatch(updateStreamNameRequest())
            axios.put(`${BASE_URL}/updateStreamName`, stream)
                .then(res => {
                    dispatch(updateStreamNameSuccess(stream))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(updateStreamNameFailure(errorMsg))
                })
    }
    
    const updateStreamCourse = (stream) => {
            // dispatch(updateStreamCourseRequest)
            axios.put(`${BASE_URL}/updateStreamsCourse`, stream)
                .then(res => {
                    dispatch(updateStreamCourseSuccess(stream))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(updateStreamCourseFailure(errorMsg))
                })
    }
    
    const updateStreamLiveStatus = (stream) => {
            dispatch(updateStreamLiveStatusRequest())
            axios.put(`${BASE_URL}/streamLiveStatus`, stream)
                .then(res => {
                    dispatch(updateStreamLiveStatusSuccess(stream))
                })
                .catch(err => {
                    const errorMsg = err.message
                    dispatch(updateStreamLiveStatusFailure(errorMsg))
                })
    }
    return {getStreams,addStream,deleteStream,updateStreamName,updateStreamCourse,updateStreamLiveStatus}
}

export default useStreamData