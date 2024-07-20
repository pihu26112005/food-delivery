/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = (props) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Menu</h1>
            <div className='explore-menu-list'>
                {menu_list.map((item, i) => {
                    return (
                        <div onClick={()=>{
                            props.set(prev=>prev===item.menu_name ? "all" : item.menu_name );
                            console.log(props.c)
                        }} key={i} className='explore-menu-item'>
                            <img className={props.c === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.name} />
                            <p >{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr/>
        </div>
    )
}

export default ExploreMenu