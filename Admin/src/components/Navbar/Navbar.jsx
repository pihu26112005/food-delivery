/* eslint-disable no-unused-vars */
import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
    <img onClick={()=>navigate('/')} className='logo' src={assets.logo} />
    <img className='profile' src={assets.profile_image} />
    </div>
  )
}

export default Navbar