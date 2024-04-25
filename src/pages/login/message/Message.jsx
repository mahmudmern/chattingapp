import React, { useEffect, useState, useRef } from 'react'
import { getDatabase, ref, onValue, set, push, remove,  } from "firebase/database";
import "./message.css"
import { useSelector, useDispatch } from 'react-redux';
import Images from '../../../utils/Images';
import { activeuser } from '../../../slices/activeUserSlice';
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiDizzy } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import ScrollToBottom from 'react-scroll-to-bottom';


const Message = () => {


  const [allmessage, setAllMessage] = useState ([])
  const [msgtext, setMsgText] = useState ("")
  const [friendList, setFriendList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const activechat = useSelector((state) => state.activeuserdata?.value)
  const dispatch = useDispatch()
  const [showemoji, setShowEmoji] = useState(false)
  const emojiRef = useRef ()
  //console.log(activechat);



  //friend read oparetion
  useEffect(() =>{
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item) =>{
      if(data.uid == item.val().whoreciveid || data.uid == item.val().whosendid){
        arr.push({...item.val(),id:item.key})
      }
      
    })
    setFriendList(arr)
  })
  },[])

let handleUser = (i)=>{
  //console.log(i);
  dispatch(activeuser(i));
}

// let handleForm = (e)=>{
//   console.log(e.target.value);
// }


// message  write operation
let handleSubmit = ()=>{
    //console.log(msgtext);
  set(push(ref(db, "message")),{
    senderid: data.uid,
    senderemail: data.email,
    sendername: data.displayName,
    message: msgtext,
    receiverid: data.uid == activechat.whoreciveid ?  activechat.whosendid : activechat.whoreciveid,
    receivername: data.uid == activechat.whoreciveid ? activechat.whosendname : activechat.whoreceivename,
    receiveremail: data.uid == activechat.whoreciveid ? activechat.whosendemail : activechat.whoreceiveemail,    
  }).then(()=>{
   // console.log("message send ");
   setMsgText("")
  })
  
}

//message read operation
useEffect(() =>{
  const messageRef = ref(db, 'message');
  onValue(messageRef, (snapshot) => {
  let arr = []
  let activeuserid = activechat.whosendid == data.uid ? activechat.whoreciveid : activechat.whosendid
  //console.log(activeuserid);
  snapshot.forEach((item) =>{
    if((item.val().senderid == data.uid &&  item.val().receiverid == activeuserid) || (item.val().receiverid == data.uid && item.val().senderid == activeuserid)){
        arr.push({...item.val(),id:item.key})  
    }
    
  })
  setAllMessage(arr)
})
},[activechat])

let handleKeyPrees = (e) =>{
   //console.log(e.key);
   if(e.key == "Enter"){
    set(push(ref(db, "message")),{
      senderid: data.uid,
      senderemail: data.email,
      sendername: data.displayName,
      message: msgtext,
      receiverid: data.uid == activechat.whoreciveid ?  activechat.whosendid : activechat.whoreciveid,
      receivername: data.uid == activechat.whoreciveid ? activechat.whosendname : activechat.whoreceivename,
      receiveremail: data.uid == activechat.whoreciveid ? activechat.whosendemail : activechat.whoreceiveemail,    
    }).then(()=>{
     //console.log("message send ");
     setMsgText("")
    })
   }
}
let handleEmojiPick = (e) =>{
  setMsgText(msgtext + e.emoji);
}

useEffect(()=>{
  document.body.addEventListener("click",(e)=>{
    // console.log(e.target);
    // console.log(emojiRef.current.contains(e.target));
    if(emojiRef.current.contains(e.target)){
      setShowEmoji(true)
    }else{
      setShowEmoji(false)
    }
  })
},[])


  return (
    <div className='msg_wrapper'>
      <div className='msg_user_body'>
          <h3 className='list_heading'>friend list</h3>
          <div className='msg_user_wrapper'>
            {
              friendList && friendList.length >0?
              friendList.map((item, index)=>(
                //<div key={index} className="msg_user_item"></div>
                <div onClick={()=>handleUser(item)} key={index} className='msg_user_item'>
                <div className='userimgbox'>
                  <Images source={data.uid == item.whosendid ? item.whoreceivephoto : item.whosendphoto} alt="img"/>
                </div>
                <div className='userinfo'>
                  <div>
                    {data.uid == item.whosendid
                      ?
                      <h3>{item.whoreceivename}</h3>
                      :
                      <h3>{item.whosendname}</h3>
                      }
                     <p>mern devoloper</p>
                  </div>
                  <button className='addbutton'>
                    message
                  </button>
                </div>
              </div> 
              ))
              :
              <h3 className='fds_check'>no friends aviable</h3>
            }
          </div>
      </div>
      {
        activechat != null ? 
        <div className='msg_box_body'>
        <div className="msg_box_heading">
          <h2>
            {activechat !== null &&
              activechat.whosendid == data.uid
              ?
              activechat.whoreceivename
              :
              activechat.whosendname
            }
          </h2>
          <p>active now</p>
        </div>
       <ScrollToBottom className='scroll_box'>
        <div className='msg_main'>
        {
          allmessage.map((item, index)=>(
            <div key={index} className={`${item.receiverid == data.uid ? "receive_msg" : "send_msg"}`}>
              <p>{item.message}</p> 	    
            </div>
          ))
        }
        </div>
        </ScrollToBottom>
        
        <div className='msg_footer'>
            <input onKeyUp={handleKeyPrees} onChange={(e)=>setMsgText(e.target.value)} value={msgtext} placeholder='enter your message' className='msg_input'/>
            {
              msgtext.length > 0 &&
              <button onClick={handleSubmit} className='send_btn'><AiOutlineSend/></button>
            }
            <div ref={emojiRef}>
              {
                showemoji ?
                <button onClick={()=>setShowEmoji(false)} className='emoji_btn'><BsEmojiDizzy/></button>
                :
                <button onClick={()=>setShowEmoji(!showemoji)} className='emoji_btn'><BsEmojiDizzy/></button>
              }
              
                 {
                  showemoji && 
                  <div className='emoji_wrapper'>
                    <EmojiPicker onEmojiClick={handleEmojiPick}/>
                  </div> 
              }                  
            </div>
                            
        </div>
    </div>
      :
      <div className='selectuser'>
        <h1>select user</h1>
      </div>
      }
      
    </div>
  )
}
export default Message