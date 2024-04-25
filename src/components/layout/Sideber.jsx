import React, { useEffect } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import Images from '../../utils/Images';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from '../../slices/userSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GrUploadOption } from "react-icons/gr";



const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
 };


const Sideber = () => {


   const navigate = useNavigate();
   const auth = getAuth();
   const dispatch = useDispatch();
   const data = useSelector((state) => state.loginuserdata.value)
   // console.log(data.email);
   // console.log(data.displayName);
   // console.log(data.photoURL); 
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);


   useEffect(()=>{
    if(!data){
     navigate("/")
    }else{ 
      navigate("/home")
    }
   },[])


   // useEffect(()=>{
   //  if(data){
   //   navigate("/home")
   //  }
   // },[])


   let handleLogout = () =>{
      signOut(auth).then(()=>{
         localStorage.removeItem("user")
         dispatch(loginuser(null)) 
          navigate("/")
         toast.success('🦄 logout seccess!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        
      })
   }

   const userinfo = auth.currentUser;
   //console.log(userinfo.displayName);
   
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Upload Profile</h2>
          <div className='img_holder'>
             <Images source={data && data.photoURL} alt="img"/>
          </div>
          <input type="file" />
        </Box>
      </Modal>
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
            theme="colored"
         />
         <div className='SideberBox'>
         <div>
            <div className='img_box'>
               <Images source={data && data.photoURL} alt="img"/>
               <div onClick={handleOpen} className='overlay'><GrUploadOption /></div>   
            </div>
             <h3 className='username'>{data && data.displayName}</h3>
             <p>{data && data.email}</p>
         </div>
         <div>
            <ul className='navigation'>
                <li>
                    <NavLink to="/home">
                        <IoHomeOutline/>
                    </NavLink>
                </li>
                <li>
                <NavLink to="/message">
                   <AiOutlineMessage />
                </NavLink>
                </li>
                <li>
                <NavLink to="/notification">
                  <IoMdNotificationsOutline />
                </NavLink>
                </li>
                <li>
                <NavLink to="/setting">
                   <IoMdSettings />
                </NavLink>
                </li>
            </ul>
         </div>
         <div>
            <button onClick={handleLogout} className='logout'>Log out</button>
         </div>
       </div>
         
    </>
  )
}

export default Sideber