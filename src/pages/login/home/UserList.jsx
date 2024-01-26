import React from 'react'
import GroupCard from '../../../components/home/GroupCard'
import Images from '../../../utils/Images'
import { TiPlus } from 'react-icons/ti'

const UserList = () => {
  return (
    <>
       <GroupCard cardtitle="user list">
        <div className='usermainbox'>
          <div className='useritem'>
            <div className='userimgbox'>
              <Images source="" alt="img"/>

            </div>
            <div className='userinfo'>
              <div className='username'>
                <h3>Arif</h3>
                <p>mern devoloper</p>
              </div>
              <button className='addbutton'>
                 <TiPlus />
              </button>
            </div>
          </div>
          <div className='useritem'>
            <div className='userimgbox'>
              <Images source="" alt="img"/>
            </div>
            <div className='userinfo'>
              <div className='username'>
                <h3>Arif</h3>
                <p>mern devoloper</p>
              </div>
              <button className='addbutton'>
                 <TiPlus />
              </button>
            </div>
          </div>
          <div className='useritem'>
            <div className='userimgbox'>
              <Images source="" alt="img"/>

            </div>
            <div className='userinfo'>
              <div className='username'>
                <h3>Arif</h3>
                <p>mern devoloper</p>
              </div>
              <button className='addbutton'>
                 <TiPlus />
              </button>
            </div>
          </div>
          <div className='useritem'>
            <div className='userimgbox'>
              <Images source="" alt="img"/>

            </div>
            <div className='userinfo'>
              <div className='username'>
                <h3>Arif</h3>
                <p>mern devoloper</p>
              </div>
              <button className='addbutton'>
                 <TiPlus />
              </button>
            </div>
          </div>
          <div className='useritem'>
            <div className='userimgbox'>
              <Images source="" alt="img"/>

            </div>
            <div className='userinfo'>
              <div className='username'>
                <h3>Arif</h3>
                <p>mern devoloper</p>
              </div>
              <button className='addbutton'>
                 <TiPlus />
              </button>
            </div>
          </div>
          <div className='useritem'>
            <div className='userimgbox'>
              <Images source="" alt="img"/>

            </div>
            <div className='userinfo'>
              <div className='username'>
                <h3>Arif</h3>
                <p>mern devoloper</p>
              </div>
              <button className='addbutton'>
                 <TiPlus />
              </button>
            </div>
          </div>
        </div>
        </GroupCard>
    </>
  )
}

export default UserList