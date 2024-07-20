/* eslint-disable no-unused-vars */
import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [active, setActive] = React.useState('Add-Item')
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <NavLink to='/add' className='sidebar-option'>
          <img src={assets.add_icon} />
          <p>Add Item</p>
        </NavLink>
        <NavLink to='/list' className='sidebar-option'>
          <img src={assets.order_icon} />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className='sidebar-option'>
          <img src={assets.order_icon} />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar


// <div className='sidebar'>
// <div className='sidebar-options'>
//   <div 
//     className={`sidebar-option ${active === 'Add-Item' ? 'active' : ''}`}
//     onClick={() => handleClick('Add-Item')}
//   >
//     <img src={assets.add_icon} />
//     <p>Add Item</p>
//   </div>
//   <div 
//     className={`sidebar-option ${active === 'List-Items' ? 'active' : ''}`}
//     onClick={() => handleClick('List-Items')}
//   >
//     <img src={assets.order_icon} />
//     <p>List Items</p>
//   </div>
//   <div 
//     className={`sidebar-option ${active === 'Orders' ? 'active' : ''}`}
//     onClick={() => handleClick('Orders')}
//   >
//     <img src={assets.order_icon} />
//     <p>Orders</p>
//   </div>
// </div>
// </div>