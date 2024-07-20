/* eslint-disable no-unused-vars */
import React from 'react'
import './List.css'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const URL = "http://localhost:3001";

const List = () => {
  const [list, setList] = useState([]);

  const fetchlist = async () => {
    const res = await axios.get('http://localhost:3001/api/food/list');
    if (res.status === 200) {
      setList(res.data);
    }
    else {
      toast.error(`Error : ${res.data.message}`)
    }
  }

  useEffect(() => {
    fetchlist();
  }, []);

  const removeitem = async (id) => {
    const res = await axios.post('http://localhost:3001/api/food/remove', { id });
    if (res.status === 200) {
      toast.success(res.data.message);
      fetchlist();
    }
    else {
      toast.error(`Error : ${res.data.message}`)
    }
  }

  return (
    <div className='cart'>
    <h1>All Food Items List</h1>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Name</p>
          <p>Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {list.map((item, i) => {
            return (
              <>
                <div key={item._id} className='cart-items-title cart-items-item'>
                  <img src={`${URL}/images/`+item.image} />
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  <p>{item.category}</p>
                  <p onClick={()=>removeitem(item._id)} className='X'>X</p>
                </div>
                <hr />
              </>
            )
          }
        )}
      </div>
    </div>
  )
}


  export default List