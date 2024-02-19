import React, { useEffect, useState } from 'react'
import GroupCard from '../../../components/home/GroupCard'
import Images from '../../../utils/Images'
import { TiPlus } from 'react-icons/ti'
import { getDatabase, ref, onValue, set, push,  } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

const UserList = () => {
  const [userList, setUserList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const [fRequest, setfRequest] = useState()
  //console.log(data);
  

//user data
  useEffect (() =>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item) =>{
      if(data.uid != item.key){
        arr.push({...item.val(),id:item.key})
      }
      
    })
    setUserList(arr)
  })
  },[])
  //console.log(userList);

  //add friend operation
  let handleFRequest = (frequestinfo)=>{
    //console.log(frequestinfo);
    set(push(ref(db, "frequestinfo")),{
      senderid: data.uid,
      sendername: data.displayName,
      senderimg: data.photoURL,
      senderemail: data.email,

      receiverid:frequestinfo.id,
      receivername:frequestinfo.username,
      receiverimg:frequestinfo.profileimg,
      receiveremail:frequestinfo.email,

    }).then(()=>{
      toast.success('Request Send', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })
  }

  //cencel request
  useEffect (() =>{
    const fRequestRef = ref(db, 'frequestinfo');
    onValue(fRequestRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item) =>{
      if(data.uid == item.val().senderid){ 
        arr.push(item.val().senderid + item.val().receiverid)
      }
      
    })
    setfRequest(arr)
  });
  
  },[])
  //console.log(fRequest);

  let handleCancle = (i) => {
    console.log(i.id);
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
       <GroupCard cardtitle="user list">
        <div className='usermainbox'>
          {userList && userList.length > 0
            ?
            userList.map((item,index)=>(
              <div key={index}  className='useritem'>
                 <div className='userimgbox'>
                  <Images source ={item.profileimg} alt="img"/>
                 </div>
              <div className='userinfo'>
                <div className='username'>
                     <h3>{item.username}</h3>
                    <p>mern devoloper</p>
                </div>
                {fRequest &&
                      fRequest.includes(item.id + data.uid) || fRequest.includes(data.uid + item.id)
                      ?
                      <button onClick={()=>handleCancle(item)} className='addbutton'>cancel</button>
                      :
                      <button onClick={()=>handleFRequest(item)} className='addbutton'>
                        add
                      </button>
                }
                
             </div>
            </div>
            ))
            :
            <h2>no user</h2>
          }
        </div>
        </GroupCard>
    </>
  )
}

export default UserList