/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { SharedContext } from '../../Context/SharedContext'

const MyOrders = () => {

    const { URL, token } = useContext(SharedContext)

    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const response = await axios.post(URL + "/api/order/userorders", {}, { headers: { token } })
            setOrders(response.data.data);
            console.log(response.data.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);



    return (
        <div className='cart'>
            <h1>My Orders</h1>
            <div className='cart-items'>
                <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Amount</p>
                    <p>Status</p>
                    <p>Date</p>
                    <p>Track Order</p>
                </div>
                <br />
                <hr />
                {orders.map((order, i) => {
                        return (
                            <>  
                                <div key={order._id} className='cart-items-title cart-items-item'>
                                    <div className='cart-items-item-subdiv'>
                                        {order.items.map((item, index) => {
                                            return(
                                                <p key={index} >{item.name} x {item.quantity}</p>
                                            )
                                        }
                                        )}
                                    </div>
                                    <p>{order.amount}</p>
                                    <p>{order.status}</p>
                                    <p>{order.date.slice(0, 10)}</p>
                                    <p className='X'>X</p>
                                </div>
                                <hr />
                            </>
                        )
                })}
            </div>
        </div>
    )
}

export default MyOrders