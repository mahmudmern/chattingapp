import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import"./login.css"
import SectionHeading from '../../components/SectionHeading';
import GoogleSvg from '../../../public/google.svg';
import Button from '@mui/material/Button';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import AuthNavigate from '../../components/AuthNavigate';
import { useNavigate } from "react-router-dom";
import loginImg from '../../assets/images/profile.jpg';
import Images from '../../utils/Images';
import { Alert, Modal, Typography } from '@mui/material';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import styledEngineSc from '@mui/styled-engine-sc';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from '../../slices/userSlice';




const Login = () => {

  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();



  let handleGoogleAuth = ()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    }); 
  }

  let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  let [passShow, setPassShow] = useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleModalClose =() => {
    setOpen(false)
  }
  let [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  let [error, setError] = useState({
    email: "",
    password: ""
  })

  let handleLoginForm = (e) =>{
    let {name, value} = e.target
    setFormData({
      ...formData,[name]:value
    })
  }


  let handleLoginSubmit = () => {
    if(!formData.email){
      setError({email: "email ny"});
    }
    else if(!formData.email.match(emailregex)){
      setError({email: "email format thik ny"});
    }else if(!formData.password){
      setError({email: ""});
      setError({password: "pass ny"});
    }else{
      signInWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential)=>{
          // console.log(userCredential);
          if(userCredential.user.emailVerified){
            localStorage.setItem("user",JSON.stringify(userCredential.user))
            dispatch(loginuser(userCredential.user))
              navigate("/home")
              //console.log(userCredential.user);
          }else{
            signOut(auth).then(()=>{
              toast.error('please verify your email!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            // console.log("please verify your email")
            // console.log("logout done")
          })
          }
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == "auth/invalid-credential"){
          setError({email: "email or password error"});
        }else{
          setError({email: ""});
        }
        console.log(errorCode);
        console.log(errorMessage);
      })
      setError({
        email: "",
        password: ""
      })
    }
  }

  let [forgetformData, setforgetFormData] = useState({
    forgetemail: "",
  })
  let [forgeterror, setforgetError] = useState({
    forgetemail: "",
  })

  let handleForgetData = (e) => {
    let {name, value} = e.target
    setforgetFormData({
      ...forgetformData,[name]:value
    })
  }

  let handleForgetSubmit = () => {
    // console.log(forgetformData);
    if(!forgetformData.forgetemail){
      setforgetError({forgetemail: "email ny"});
    }
    else if(!forgetformData.forgetemail.match(emailregex)){
      setforgetError({forgetemail: "email format thik ny"});
    }else{
      setforgetError({forgetemail: ""})
      //console.log(forgetformData);
      sendPasswordResetEmail(auth, forgetformData.forgetemail)
        .then(() => {
          console.log("email sent successfully..");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }


  return (
    <>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styledEngineSc}>
            <div className='forgot_main_box'>
            <button onClick={handleModalClose} className='close_btn'>Close</button>
            <div className='forgot_box'>
              <h2>Forgot Password</h2>
              <div>
                <Input onChange={handleForgetData} name="forgetemail" type="email" labeltext="Email Address" variant="standard"/>
                  {forgeterror.forgetemail &&
                      <Alert severity="error">{forgeterror.forgetemail}</Alert>
                    }
              </div>
                 <CustomButton onClick={handleForgetSubmit} text="Send Link" variant="contained"/>  
            </div>
            </div>   
          </Box>
        </Modal>
   
         <Box>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <div className='loginbox'>
                  <div className='loginbox__inner'>
                    <SectionHeading style="auth_heading" text="Login to your account!"/>
                    <div onClick={handleGoogleAuth} className='provider_login'>
                        <img src={GoogleSvg}/>
                        <span>Login with Google</span>
                    </div>
                    <div className='form_main'>
                      <div>
                        <Input onChange={handleLoginForm} name="email" type="email" variant="standard" labeltext="Email Address" style="login_input_field"/>
                        {error.email &&
                          <Alert severity="error">{error.email}</Alert>
                        }
                      </div>
                      <div className='icondiv'>
                        <Input onChange={handleLoginForm} name="password" type={passShow ? "text" : "password"} variant="standard" labeltext="Password" style="login_input_field"/>
                          <div className='showeye' onClick={()=>setPassShow(!passShow)}>
                            {passShow ? <FaEye />: <FaEyeSlash />}
                          </div>
                        {/* <button onClick={()=>setPassShow(!passShow)}>{passShow ? <FaEye />: <FaEyeSlash />}</button> */}
                        {error.password &&
                          <Alert severity="error">{error.password}</Alert>
                        }
                      </div>
                      <CustomButton onClick={handleLoginSubmit} styleing="loginbtn" variant='contained' text="login to continue"/>
                    </div>
                    <AuthNavigate style="loginauth" link="/registration" linktext="sing up" text="Don't have an account?"/>
                    {/* <AuthNavigate style="loginauth" linktext="Forget Password" text="Password vulea gaco?"/> */}
                    <p className='loginauth'>
                      Password vulea gaco?
                      <span onClick={handleOpen}>Forget Password</span>
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className='loginimg'>
                     <Images source={loginImg} alt="img"/>
                </div>
              </Grid>
             
            </Grid>
        </Box>
        
    </>
  )
}

export default Login