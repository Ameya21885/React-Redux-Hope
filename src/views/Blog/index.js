import React from 'react'
import './blog.css'
import {
  Typography,
  TextField,
  Button,
  Box,
  Input,
  TextareaAutosize,
  Avatar,
  Stack,
  Alert,
  AlertTitle
} from '@mui/material'

import { useState,useRef } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import { useEffect } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';


const Inputing = styled('input')({
  display: 'none',
});


const saveBody = ({ body }) => {
  localStorage.setItem('body', body);
}

function Blog() {

  const titleMax = 30;
  const bodyMax = 350;
  const imgMax = 2097152;
  const tagMax = 7;

  const [title, setTitle] = useState("");
  const [hash, setHash] = useState("");
  const [hashes, setHashes] = useState([]);
  const [body, setBody] = useState("");
  const [titleLimit, setTitleLimit] = useState(false)
  const [bodyLimit, setBodyLimit] = useState(false)
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [emptyField, setEmptyField] = useState(false)
  const [exceedLimit, setExceedLimit] = useState(false)
  const [success, setSuccess] = useState(false)
  const [img, setImg] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [err,setErr] = useState(false);
  const inputRef = useRef(null);

  



  useEffect(() => {
    setTimeout(() => {
      setEmptyField(false)
      setExceedLimit(false)
      setSuccess(false)
      setErr(false)
    }, 5000)
  }, [emptyField, exceedLimit, success,err])

  useEffect(()=>{

  },[setBody,setTitle])

  const Hash = ({ value }) => {
    return <div>
      <Button variant="contained" sx={{ margin: 1 }}>{value} <ClearIcon onClick={() => {
        var temp = [];
        hashes.forEach((val) => {
          if (!(val === value)) {
            temp.push(val)
          }
        })
        setHashes(temp);
      }} /> </Button>
    </div>
  }

  const submitPost = async () => {
    const author = JSON.parse(localStorage.getItem("user")).full_name;
    const tages = hashes.join(',')

    const formData = new FormData();
    formData.append("image", img);
    formData.append("title", title);
    formData.append("description", body);
    formData.append("tags",tages);
    formData.append("author", author);
    
    
    setIsloading(true)
    const BASE_URL = process.env.REACT_APP_API_URL;
    axios.post(`${BASE_URL}/addBlog`, formData, {
      headers: {
        authorization: localStorage.getItem("token"),
      }
    })
      .then((res) => {
        localStorage.removeItem('body')
        setBody("")
        setTitle("")
        setHashes([])
        
        setImageUrl("")
        setSuccess(true)
        console.log(res);
      })
      .catch((err) => {
        setErr(true)
        console.log(err);
      })
      .finally(() => {
        setIsloading(false);
      })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (title === "" || body === "") {
      setEmptyField(true)
    } else if (titleLimit || bodyLimit) {
      setExceedLimit(true)
    } else {

      submitPost(e);
    }

  }


  return (
    <Box className='delet' sx={{ padding: { xs: '2px', md: '30px'}, position: 'relative' }}>
      {emptyField && <Alert severity="error"
        sx={{ position: 'absolute', right: 20, top: -3, zIndex: 100 }}>
        <AlertTitle>Error</AlertTitle>
        Please check your post — <strong>requried field should not be left empty!</strong>
      </Alert>}
      {err&&<Alert severity="error"
        sx={{ position: 'absolute', right: 20, top: -3, zIndex: 100 }}>
        <AlertTitle>Error</AlertTitle>
        post is not posted — <strong>please try again!</strong>
      </Alert>}
      {isloading&&<Alert severity="info"
        sx={{ position: 'absolute', right: 20, top: -3, zIndex: 100 }}>
        <AlertTitle>Posting....</AlertTitle>
        post is being posting — <strong>please wait!</strong>
      </Alert>}
      {exceedLimit && <Alert severity="error"
        sx={{ position: 'absolute', right: 20, top: -3, zIndex: 100 }}>
        <AlertTitle>Error</AlertTitle>
        Please check your post — <strong>Eceeded word limit!</strong>
      </Alert>}
      {success && <Alert severity="success"
        sx={{ position: 'absolute', right: 20, top: -3, zIndex: 100 }}>
        <AlertTitle>Success</AlertTitle>
        Your Post have been posted successfully
      </Alert>}
      <div style={{ display: 'flex'
      // , border:'2px solid black'
       }}>
        <Typography
          color="textPrimary"
          variant="h4"
          sx={{ mr: 2 }}
        >
          New Post
        </Typography>
        <Avatar sx={{ bgcolor: '#448aff' }}>
          <PostAddIcon fontSize='large' />
        </Avatar>
      </div>
      <TextField
        required
        value={title}
        name="title"
        id="title"
        label="title"
        variant="standard"
        onChange={(e) => {
          setTitle(e.target.value)
          var titleSize = e.target.value.split(" ")
          if (titleSize.length > titleMax) {
            setTitleLimit(true);
          } else {
            setTitleLimit(false);
          }
        }}
        sx={{
          width: '100%'
        }}
      />
      {titleLimit && <p style={{ color: 'red' }}>Title Limit Exceeded</p>}
      <Box
        sx={{ display: 'flex', alignItems: 'end', marginTop: 5 }} >
        <Input id="component-disabled" value={hash} placeholder="Keyword" onChange={(e) => {
          setHash(e.target.value)
        }
        } />
        <Button variant="outlined" onClick={() => {
          if (hash !== ''&&!hashes.includes(hash)&&hashes.length<tagMax) {
            setHashes([...hashes, hash])
          }
          setHash("");
        }}><CreateIcon sx={{ mr: 1 }} />Create </Button>
      </Box>
      <Box
        sx={{ display: 'flex', alignItems: 'end', marginTop: 1, mb: 4, flexWrap: 'wrap' }} >
        {hashes.map((value) => <Hash value={value} key={value} />)}
      </Box>


<div className='delet'> 
      <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', width: '100%' }}>
        <Button  variant="outlined"
          onClick={() => {
            saveBody({ body })
          }}
        >
          Save
        </Button>
        <Button variant="contained" sx={{marginRight:2,marginLeft:2}}
        onClick={()=>{
          setBody(localStorage.getItem('body'))
        }}>
        Load
        </Button>
        <DeleteIcon id="deletTextbox" fontSize='large' sx={{ cursor: 'pointer' }}
          onClick={() => {
            setBody("")
            localStorage.removeItem('body')
          }} />
      </div>
      <TextareaAutosize
        required

        aria-label="minimum height"
        minRows={15}
        value={body}
        placeholder="Write body over here..."
        style={{ width: '100%',fontFamily:'serif',fontSize:'15px' }}
        onChange={(e) => {
          var bodySize = e.target.value.replaceAll("( )+"," ").split(" ")
          if (bodySize.length > bodyMax) {
            setBodyLimit(true);
          } else {
            setBodyLimit(false);
          }
          setBody(e.target.value)
        }}
      />
      {bodyLimit && <p style={{ color: 'red' }}>body Limit Exceeded</p>}
      </div>





      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor="contained-button-file"
            sx={{ m: 2, width: '30px' }}>
            <Inputing accept="image/*"
              name="imagePost"
              id="contained-button-file"
              multiple type="file"
              ref={inputRef}
              onChange={(e) => {
                // e.preventDefault()
                if(e.target.files[0].size<=imgMax){
                setImageUrl(URL.createObjectURL(e.target.files[0]));
                
                setImg(e.target.files[0])
                const imgName = e.target.files[0].name
                setImageName(imgName)}
              }} />
            <Button variant="contained" component="span" sx={{ mt: 4, mb: 4 }}>
              Upload <InsertPhotoIcon />
            </Button>
          </label>
        </Stack>
        {imageUrl !== "" && <Button variant="outlined"
          sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
          onClick={() => {
            setImageUrl("")
            setImg({})
            setImageName("")
            inputRef.current.value = null;
          }}>
          {imageName}
          <CloseIcon />
        </Button>}

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
          <img src={imageUrl} width="50%" alt="" /></div>

      </div>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}
      >
        <Button variant="contained" onClick={
          () => {
            setBody("")
            setImageUrl("")
            setTitle("")
            inputRef.current.value = null;
          }
        }
          endIcon={< DeleteIcon />}>delete</Button>
        <Button variant="contained"
          type='submit'
          endIcon={<SendIcon />}
          onClick={handleSubmitForm}
        >
          post
        </Button>
      </div>
    </Box>
  )
}

export default Blog

