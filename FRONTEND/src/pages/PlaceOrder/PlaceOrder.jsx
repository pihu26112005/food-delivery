/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { SharedContext } from '../../Context/SharedContext'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();

  const { food_list, cartitems, setCartitems, addtocart, removefromcart, gettotalamount, URL, token, setToken } = useContext(SharedContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const placeorder = async (e) => {
    e.preventDefault();

    let orderitems = [];
    food_list.map((item) => {
      if (cartitems[item._id]) {
       let iteminfo =item;
       iteminfo["quantity"] = cartitems[item._id];
        orderitems.push(iteminfo);
      }
    })

    let orderData = {
      address: data,
      items: orderitems,
      amount: gettotalamount()
    }

    const res = await axios.post(URL + "/api/order/placeorder", orderData, { headers: { token } });

    if(res.data.success){
      // setCartitems({});
      // toast.success("your order got placed successfully");
      navigate("/myorders");
    }
    else
    {
      alert(res.data.message);
    }
  }

  return (
    <div className="place-order">
      <h2>Finalize Order</h2>
      <form onSubmit={placeorder}>
        <input onChange={handleChange} name="name" value={data.name} type="text" placeholder="Name" required />
        <input onChange={handleChange} name="email" value={data.email} type="email" placeholder="Email" required />
        <input onChange={handleChange} name="address" value={data.address} type="text" placeholder="Address" required />
        <input onChange={handleChange} name="city" value={data.city} type="text" placeholder="City" required />
        <input onChange={handleChange} name="postalCode" value={data.postalCode} type="text" placeholder="Postal Code" required />
        <button type="submit">Finalize Order</button>
      </form>
    </div>
  )
}

export default PlaceOrder