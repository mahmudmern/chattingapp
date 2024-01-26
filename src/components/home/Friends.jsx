import React from 'react'
import GroupCard from './GroupCard'
import Images from '../../utils/Images'
import { TiPlus } from 'react-icons/ti'

const Friends = () => {
  return (
    <>
    <GroupCard cardtitle="friends">
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