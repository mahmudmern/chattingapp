import React from 'react'
import UserList from './UserList';
import Friends from '../../../components/home/Friends';
import FriendsRequest from '../../../components/home/FriendsRequest';
import BlockList from '../../../components/home/BlockList';
import GroupList from '../../../components/home/GroupList';
import MyGroup from '../../../components/home/MyGroup';

const Home = () => {
  return (
    <div className='home_wrapper'>
      <UserList/>
      <Friends/>
      <FriendsRequest/>
      <BlockList/>
      <GroupList/>
      <MyGroup/>
      
    </div>
  )
}

export default Home