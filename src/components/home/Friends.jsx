import React, { useEffect, useState } from 'react'
import GroupCard from './GroupCard'
import Images from '../../utils/Images'
import { TiPlus } from 'react-icons/ti'
import { getDatabase, ref, onValue, set, push,  } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

const Friends = () => {
  const [friendList, setFriendList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)

  useEffect(() =>{
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item) =>{
      if(data.uid == item.val().whoreciveid){
        arr.push({...item.val(),id:item.key})
      }
      
    })
    setFriendList(arr)
  })
  },[])
   console.log(friendList);
  return (
    <>
    <GroupCard cardtitle="friends">
        <div className='usermainbox'>
        {friendList && friendList.map((item,index)=>(
              <div key={index} className='useritem'>
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
                  Block
                </button>
              </div>
            </div>  
            ))}
        </div>
      </GroupCard>
    </>
  )
}

export default Friends