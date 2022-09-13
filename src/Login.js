import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Link, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginFailure, loginRequest, loginSuccess } from "./features/userSlice";
import { Navigate } from "react-router-dom";
import { Container } from "@mui/system";
import Alert from '@mui/material/Alert';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"©"} {new Date().getFullYear()}{" "}
      <Link color="inherit" href="/">
        Campus Street, All rights reserved.
      </Link>{" "}
    </Typography>
  );
}

function SocialHandles() {
  return (
    <Typography variant="subtitle2" color="textPrimary" align="center">
      <Link color="inherit" href="https://www.facebook.com/thecampusstreet">
        Facebook
      </Link>{" "}
      {" | "}
      <Link color="inherit" href="https://www.instagram.com/thecampusstreet">
        Instagram
      </Link>
      {" | "}
      <Link
        color="inherit"
        href="https://www.linkedin.com/company/thecampusstreet"
      >
        LinkedIn
      </Link>
      {" | "}
      <Link color="inherit" href="https://www.twitter.com/thecampusstreet">
        Twitter
      </Link>
      {" | "}
      <Link
        color="inherit"
        href="https://www.kooapp.com/profile/thecampusstreet"
      >
        Koo
      </Link>
    </Typography>
  );
}



export default function Login() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const theme = useTheme()

  const styles = {
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  };

  const loginConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const BASE_URL = process.env.REACT_APP_API_URL;


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginRequest());
    console.log(email);
    console.log(password)
    if(email===""||password===""){
      setIsempty(true)
      setTimeout(()=>{
        setIsempty(false);
      },3000)
    }else{
    axios
      .post(`${BASE_URL}/login`, { email, password }, loginConfig)
      .then((res) => {
        let currUser = res.data.user_profile;
        localStorage.setItem("token", res.data.st);
        localStorage.setItem("user", JSON.stringify(res.data.user_profile));
        dispatch(loginSuccess(currUser));
        alert("Welcome To Campus Street");
      })
      .catch((error) => {
        let errorMsg = error.message;
       
          setIsCorrect(true)
          setTimeout(()=>{
            setIsCorrect(false);
          },3000)
        
        dispatch(loginFailure(errorMsg));
      });
    }
  };

  const [isempty,setIsempty]=useState(false);
  const [isCorrect,setIsCorrect] = useState(false);

  return userData.isLoggedIn ? (
    <Navigate to="/admin/dashboard" replace={true} />
  ) : (
    <Container component="main" maxWidth="xs" >
      <Box sx={styles.paper}>
      <Box component="img" alt="Logo" src="/240_50.png" width={'20em'} mt={1}/>
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h5" variant="h5">
          Sign in
        </Typography>
        {userData.isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <Box sx={styles.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onKeyPress={(e)=>{
                if (e.key === "Enter") {
                  submitHandler(e);
                }
              }}
              onChange={(e) => {
                console.log(e.target);
                setPassword(e.target.value)}}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={styles.submit}
              onClick={(e) => submitHandler(e)}
            >
              Sign In
            </Button>
          </Box>
        )}
      </Box>
      <Box mt={2}>
        <SocialHandles />
        <Copyright />
      </Box>
      <br />
      {isCorrect&& <Alert severity="error">Invalid email and password — check it out!</Alert>}
      {isempty&& <Alert severity="error">Required field are empty — check it out!</Alert>}
    </Container>
  );
}
