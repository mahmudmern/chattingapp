import React, { useEffect, useState } from 'react'
import GroupCard from '../../../components/home/GroupCard'
import Images from '../../../utils/Images'
import { TiPlus } from 'react-icons/ti'
import { getDatabase, ref, onValue, set, push, remove,  } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

const UserList = () => {
  const [userList, setUserList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const [fRequest, setfRequest] = useState([])
  const [friendList, setFriendList] = useState([])

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
    set(ref(db, "frequestinfo/" + frequestinfo.id),{
      senderid: data.uid,
      sendername: data.displayName,
      senderimg: data.photoURL,
      senderemail: data.email,

      receiverid: frequestinfo.id,
      receivername: frequestinfo.username,
      receiverimg: frequestinfo.profileimg,
      receiveremail: frequestinfo.email,

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
  


//friends request data 
useEffect (() =>{
  const fRequestRef = ref(db, 'frequestinfo');
  onValue(fRequestRef, (snapshot) => {
  let arr = []
  snapshot.forEach((item) =>{
    if(item.val().senderid == data.uid){ 
      arr.push(item.val().receiverid + item.val().senderid)
    }
    
  })
  setfRequest(arr)
});

},[])


//friend data
useEffect(() =>{
  const friendsRef = ref(db, 'friends');
  onValue(friendsRef, (snapshot) => {
  let arr = []
  snapshot.forEach((item) =>{
    if(item.val().whoreceiveid == data.uid || item.val().whosendid == data.uid){
      arr.push(item.val().whoreceiveid + item.val().whosendid)
    }
    
  })
  setFriendList(arr)
})
},[])

  
  // useEffect (() =>{
  //   const fRequestRef = ref(db, 'frequestinfo');
  //   onValue(fRequestRef, (snapshot) => {
  //   let arr = []
  //   snapshot.forEach((item) =>{
  //     if(item.val().whoreceiveid == data.uid || item.val().whosendid == data.uid){
  //       arr.push(item.val().whoreceiveid + item.val().whosendid)
  //     }
      
  //   })
  //   setfRequest(arr)
  // });
  
  // },[])
  //console.log(fRequest);

  let handleCancle = (i) => {
    //console.log(i.id);
    remove(ref(db, "frequestinfo/" + i.id)).then(()=>{
       //toast("Request Cencel")
    })
  }

  //console.log(fRequest);
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
                <div>
                     <h3>{item.username}</h3>
                     <p>mern devoloper</p>
                </div>
                { 
                      fRequest.length > 0 && fRequest.includes(item.id + data.uid) || fRequest.includes(data.uid + item.id)
                      ?<>
                        <button className='addbutton'>pending</button>
                        <button onClick={()=>handleCancle(item)} className='addbutton'>cancel</button>
                      </>
                      :
                      friendList.includes(item.id + data.uid) || friendList.includes(data.uid + item.id)
                      ?
                      <button className='addbutton'>friend</button>
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