/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { SharedContext} from '../../Context/SharedContext';

const Navbar = ({setShowin}) => {

    const { food_list, cartitems, setCartitems, addtocart, removefromcart,gettotalamount ,token,setToken } = useContext(SharedContext)

    const [menu, setMenu] = useState("Home");

    const navigate = useNavigate();

    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
        navigate("/");
    }

    return (

        <div className='navbar'>
            <img src={assets.logo} alt='logo' className='logo' />
            <ul className='navbar-menu'>
                <Link to='/' onClick={()=>setMenu("Home")} className={menu=="Home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu=="menu" ? "active" : ""}>menu</a>
                <a href='#food-display' onClick={()=>setMenu("Mobile app")} className={menu=="Mobile app" ? "active" : ""}>Mobile app</a>
                <a href='#footer' onClick={()=>setMenu("Contact")} className={menu=="Contact" ? "active" : ""}>Contact</a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt='search' className='search' />
                <div className='navbar-search-icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt='search' /></Link>
                    {gettotalamount()===0 ? "" : <div className='dot'> </div>}
                </div>
                {!token?<button onClick={()=>{setShowin(true)}} >Sign in</button>
                :<div className='navbar-profile' >
                <img src={assets.profile_icon} alt='profile' />
                <ul className='navbar-profile-dropdown'>
                    <li onClick={()=>navigate('/myorders')} > <img src={assets.bag_icon} /> Orders</li>
                    <hr />
                    <li onClick={logout} > <img src={assets.logout_icon} /> LogOut</li>
                </ul>
               </div>}
            </div>
        </div>
    )
}

export default Navbar
