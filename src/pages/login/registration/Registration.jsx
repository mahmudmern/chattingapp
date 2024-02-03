import { Alert, Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import SectionHeading from '../../../components/SectionHeading'
import Input from '../../../components/Input'
import CustomButton from '../../../components/CustomButton'
import AuthNavigate from '../../../components/AuthNavigate'
import Images from '../../../utils/Images'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification,updateProfile } from "firebase/auth";
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";
import RegiImg from "../../../assets/images/registation.jpg"
import Login from '../Login'
import { getDatabase, ref, set } from "firebase/database";



const Registration = () => {
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const [loder,setLoder] = useState(false)

  let [error,setError] = useState({
    email : "",
    fullname : "",
    password : "",
  })
  let [signupData,setSignupData] = useState({
    email : "",
    fullname : "",
    password : "",
  })
  let handleForm = (e) =>{
    let {name, value} = e.target
    setSignupData({
      ...signupData,[name]:value
    })
    //console.log(e.target);
  }
  let emailregex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  let handleSubmit = () =>{
    if(!signupData.email){
      setError({email: "no email"})
    }
    else if(!signupData.email.match(emailregex)){
      setError({email: "email format thik ny"});
      }
    else if(!signupData.fullname){
      setError({email: ""})
      setError({fullname: "no fullname"})
    }else if(!signupData.password){
      setError({fullname: ""})
      setError({password: "no password"})
    }else{
      setLoder(true)
      setError({
        email : "",
        fullname : "",
        password : "",
      })
      createUserWithEmailAndPassword(auth, signupData.email, signupData.password).then((userCredential)=>{
        sendEmailVerification (auth.currentUser).then(()=>{
          //console.log("send email");
          updateProfile(auth.currentUser, {
            displayName: signupData.fullname,
            photoURL: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
          }).then(()=>{
            set(ref(db, 'users/' + userCredential.user.uid), {
              username: userCredential.user.displayName,
              email: userCredential.user.email,
              profileimg: userCredential.user.photoURL
            }).then(()=>{
              navigate("/")
              console.log(userCredential);
            })
            
          })
          
        });
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode =="auth/email-already-in-use"){
          setError({email: "email already exist"})
        }else{
          setError({email: ""})
        }
      });
      setSignupData({
        email : "",
        fullname : "",
        password : "",
      })
      setTimeout(()=>{
        setLoder(false)
      },1500)
      
      //console.log(signupData);
    }
   
  }
  return (
    <Box>
        <Grid container spacing={0}>
         <Grid item xs={6}>
          <div className='loginbox'>
            <div className='loginbox_inner'>
               <SectionHeading style="log_heading" text="Get started with easily register"/>
               <div className='form_main'>
                <div>
                   <Input onChange={handleForm} name="email" value={signupData.email} type="email" variant="outlined" labeltext="Email Address" style="login_input_filed"/>
                   {error.email &&
                    <Alert severity="error">{error.email}</Alert>
                   }
                </div>
                <div>
                   <Input onChange={handleForm} name="fullname" value={signupData.fullname} type="text" variant="outlined" labeltext="Full Name" style="login_input_filed"/>
                   {error.fullname &&
                    <Alert severity="error">{error.fullname}</Alert>
                   }                   
                </div>
                <div>
                   <Input onChange={handleForm} name="password" value={signupData.password} type="password" variant="outlined" labeltext="password" style="login_input_filed"/>
                   {error.password &&
                     <Alert severity="error">{error.password}</Alert>
                   }
                </div>
               { loder ?
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                    :
                   <CustomButton onClick={handleSubmit} styleing="loginbtn" variant='Contained' text="sign up"/>
                   }
                   <AuthNavigate style="loginauth" link="/" linktext="sign in" text="Already  have an account"/>
               </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
        <div className='regiimg'>
          <Images source={RegiImg} alt="img"/>
        </div>
        </Grid>
        </Grid>
    </Box>
  )
}

export default Registration