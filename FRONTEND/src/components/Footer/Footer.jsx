/* eslint-disable no-unused-vars */
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img src={assets.logo} alt='logo' />
                    <div className='footer-socialmedia'>
                        <img src={assets.facebook_icon} alt='logo' />
                        <img src={assets.twitter_icon} alt='logo' />
                        <img src={assets.linkedin_icon} alt='logo' />
                    </div>
                </div>
                <div className='footer-content-centre'>
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h3>Get In Touch</h3>
                    <ul>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright' > copyright 2024 ℗ - All Rights Reserved  </p>
        </div>
    )
}

export default Footer