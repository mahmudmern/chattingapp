import React, { useEffect, useState } from 'react'
import GroupCard from './GroupCard'
import Images from '../../utils/Images'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useSelector } from 'react-redux'

const BlockList = () => {
  const [blockList, setBlockList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)

  useEffect(() =>{
    const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item) =>{
      if(item.val().whoblockid == data.uid){
        arr.push({...item.val(),id:item.key})
      }
      
    })
    setBlockList(arr)
  })
  },[])
  //console.log(blockList);
  return (
    <>
        <GroupCard cardtitle="Block List">
        <div className='usermainbox'>
        {blockList && blockList.map((item,index)=>(
              <div key={index} className='useritem'>
              <div className='userimgbox'>
                <Images source="" alt="img"/>
  
              </div>
              <div className='userinfo'>
                <div className='username'>
                  <h3>{item. blockname}</h3>
                  <p>mern devoloper</p>
                </div>
                <button className='addbutton'>
                  Unblock
                </button>
              </div>
            </div>  
            ))}
        </div>
      </GroupCard>
    </>
  )
}

export default BlockList