import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import Images from '../../utils/Images';

const Sideber = () => {
  return (
    <>
       <div className='SideberBox'>
         <div>
            <div className='img_box'>
               <Images source="" alt="img"/>
            </div>
             <h3 className='username'>Md Arif Mahmud</h3>
         </div>
         <div>
            <ul className='navigation'>
                <li>
                    <NavLink to="/home">
                        <IoHomeOutline/>
                    </NavLink>
                </li>
                <li>
                <NavLink to="/message">
                   <AiOutlineMessage />
                </NavLink>
                </li>
                <li>
                <NavLink to="/notification">
                  <IoMdNotificationsOutline />
                </NavLink>
                </li>
                <li>
                <NavLink to="/setting">
                   <IoMdSettings />
                </NavLink>
                </li>
            </ul>
         </div>
         <div>
            <button className='logout'>Log out</button>
         </div>
       </div>
         
    </>
  )
}

export default Sideber