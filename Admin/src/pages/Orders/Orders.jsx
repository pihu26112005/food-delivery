/* eslint-disable no-unused-vars */
import React from 'react'
import './Orders.css'
import { useState } from 'react';
const URL = "http://localhost:3001";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from '../../assets/assets'

const Orders = () => {
  const [allorders, setallorders] = useState([]);

  const fetchAllOrders = async () => {
    const res = await axios.get('http://localhost:3001/api/order/allorders');
    if (res.status === 200) {
      setallorders(res.data.data);
    }
    else {
      toast.error(`Error : ${res.data.message}`)
    }
  }

  const updateStatus = async (orderID, event) => {
    const res = await axios.post('http://localhost:3001/api/order/updatestatus', { orderID, status:event.target.value });
    if (res.status === 200) {
      await fetchAllOrders();
      toast.success(res.data.message)
    }
    else {
      toast.error(`Error : ${res.data.message}`)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);



  return (
    <div className='order-add Add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {allorders.map((order, i) => (
          <div className='order-item' key={i}>
            <img src={assets.parcel_icon} />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "x" + item.quantity
                  }
                  else {
                    return item.name + "x" + item.quantity + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.name}</p>
              <p className='order-item-address'> {order.address.address + "," + order.address.city + "," + order.address.postalCode} </p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>
            <select value={order.status} onChange={(event)=>updateStatus(order._id,event)} >
              <option value="Processing">Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders