import React from 'react'
import GroupCard from './GroupCard'
import Images from '../../utils/Images'

const FriendsRequest = () => {
  return (
    <>
    <GroupCard cardtitle="friends request">
        <div className='usermainbox'>
            {[0,1,2,3,4,5,6,7,8,9,10].map((item,index)=>(
              <div key={index} className='useritem'>
              <div className='userimgbox'>
                <Images source="" alt="img"/>
  
              </div>
              <div className='userinfo'>
                <div className='username'>
                  <h3>Arif</h3>
                  <p>mern devoloper</p>
                </div>
                <button className='addbutton'>
                  Accept
                </button>
              </div>
            </div>  
            ))}
        </div>
      </GroupCard>
    </>
  )
}

export default FriendsRequest