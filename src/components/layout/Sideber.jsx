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


const Sideber = () => {


   const data = useSelector((state) => state.loginuserdata.value)
   // console.log(data.email);
   // console.log(data.displayName);
   // console.log(data.photoURL);


   const navigate = useNavigate();
   const auth = getAuth();
   const dispatch = useDispatch();


   useEffect(()=>{
    if(!data){
     navigate("/")
    }
   },[])


   useEffect(()=>{
    if(data){
     navigate("/home")
    }
   },[])


   let handleLogout = () =>{
      signOut(auth).then(()=>{
         // ajkr kaj
         localStorage.removeItem("user")
         dispatch(loginuser(null)) 
         // ajkr kaj ses
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