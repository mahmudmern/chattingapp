import React, { useEffect, useState } from 'react'
import GroupCard from './GroupCard'
import Images from '../../utils/Images'
import { getDatabase, ref, onValue, set, push, remove, } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';




const FriendsRequest = () => {

  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  //console.log(data);
  const [fRequest, setfRequest] = useState()

 

  useEffect (() =>{
    const fRequestRef = ref(db, 'frequestinfo');
    onValue(fRequestRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item) =>{
      if(data.uid == item.val().receiverid){ 
        arr.push({...item.val(),id:item.key})
      }
      
    })
    setfRequest(arr)
  });
  
  },[])
   //console.log(fRequest);

 let handleCFRequest = (cencelinfo)=>{
  //console.log(cencelinfo);
  remove(ref(db, "frequestinfo/" + cencelinfo.id)).then(()=>{
    //toast("Request Cencel")
  })
 }


 let handleAFRequest = (acceptinfo) =>{
  //console.log(acceptinfo);
  set(push(ref(db, "friends")),{
    //sender info
    whosendname: acceptinfo.sendername,
    whosendid: acceptinfo.senderid,
    whosendemail: acceptinfo.senderemail,
    whosendphoto: acceptinfo.senderimg,
    
    //receiver info
    whoreceivename: data.displayName,
    whoreciveid: data.uid,
    whoreceiveemail: data.email,
    whoreceivephoto: data.photoURL
  }).then(()=>{
    remove(ref(db, "frequestinfo/" + acceptinfo.id))
    // toast.success('accept request', {
    //   position: "top-center",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    //   });
  })
}
 
  return (
    <>
    <ToastContainer/>
    <GroupCard cardtitle="friends request">
        <div className='usermainbox'>
           {fRequest && fRequest.length > 0 ?
           fRequest.map((item,index)=>(
            <div key={index} className='useritem'>
              <div className='userimgbox'>
                <Images source={item.senderimg} alt="img"/>
              </div>
              <div className='userinfo'>
                <div className='username'>
                  <h3>{item.sendername}</h3>
                  <p>mern devoloper</p>
                </div>

                <div className='buttongroup'>
                <button onClick={()=>handleAFRequest(item)} className='addbutton'>
                  Accept
                </button>
                <button onClick={()=>handleCFRequest(item)} className='addbutton'>
                  cencel
                </button>
                </div> 
              </div>
            </div>  
           ))
           :
           <h2>No Request</h2>
           } 
        </div>
      </GroupCard>
    </>
  )
}

export default FriendsRequest