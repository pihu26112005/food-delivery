/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './In.css'
import { assets } from '../../assets/assets';
import { SharedContext } from '../../Context/SharedContext';
import axios from 'axios';

const In = ({ setShowin }) => {
    const [currstate, setCurrstate] = useState("Sign");

    const [data , setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const {URL,token,setToken} = useContext(SharedContext);

    const formsubmit = async (e) => {
        e.preventDefault();
        let newurl = URL;
        if(currstate==="Sign"){
            newurl = newurl + "/api/user/register";
        }
        else{
            newurl = newurl + "/api/user/login";
        }
        const res = await axios.post(newurl, data);

        if(res.data.success){
            setToken(res.data.token);
            localStorage.setItem("token",res.data.token);
            setShowin(false);
        }
        else{
            alert(res.data.message);
        }
        
    }

    return (
        <div className='in-form'>
            <form onSubmit={formsubmit} className='in-form-container'>
                <div className='in-form-title'>
                    <h1>{currstate}</h1>
                    <img onClick={() => setShowin(false)} src={assets.cross_icon} />
                </div>
                <div className='in-form-inputs'>
                    {currstate == "Sign" && <input onChange={handleChange} value={data.name} type='text' name='name' placeholder='your name' required />}
                    <input onChange={handleChange} value={data.email} type='email' name='email' placeholder='your email' required />
                    <input onChange={handleChange} value={data.password} type='password' name='password' placeholder='your password' required />
                </div>
                <button type='submit' >{currstate === "Sign" ? "Create Account" : "Log In"}</button>
                {currstate === "Sign" 
                && <div className='in-form-condition'>
                    <input type='checkbox' required />
                    <p> By continuing , I agree tot he terms of use & privacy policyy.</p>
                </div>}

                {currstate === "Sign"
                    ? <p>Already have an account<span onClick={() => setCurrstate("Log")} >Log-in here</span> </p>
                    : <p>Create a new account<span onClick={() => setCurrstate("Sign")} >Click here</span> </p>}
            </form>
        </div>
    )
}

export default In