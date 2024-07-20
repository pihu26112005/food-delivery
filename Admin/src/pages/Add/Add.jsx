/* eslint-disable no-unused-vars */
import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: ''
  });

  const handlechange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', data.price);
    formData.append('image', image);

    const res = await axios.post('http://localhost:3001/api/food/add', formData);
    if (res.data.success) {
      setData({
        name: "",
        description: "",
        category: 'Salad',
        price: ""
      });
      setImage(false);
      toast.success(res.data.message);
    }
    else
    {
      toast.error(res.data.message);
    }
  }

  return (
    <div className='add'>
      <form className='flex-col'>
        <div className='flex-col add-img'>
          <p>Upload Image</p>
          <label htmlFor='img'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='upload' />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} id='img' type='file' required hidden />
        </div>
        <div className='flex-col add-name'>
          <p> Add Name </p>
          <input onChange={handlechange} value={data.name} className='lamba' type='text' name='name' placeholder='Name' required />
        </div>
        <div className='flex-col add-descrip'>
          <p> Product Description </p>
          <textarea onChange={handlechange} value={data.description}  className='lamba' name='description' placeholder='Description' rows="6" required />
        </div>
        <div className='flex-col add-category'>
          <p> Add Category </p>
          <select onChange={handlechange} value={data.select} name='category' required>
            <option value='Salad'>Salad</option>
            <option value='Rools'> Rools</option>
            <option value='Deserts'>Deserts</option>
            <option value='Sandwitch'> Sandwitch</option>
            <option value='Cake'>Cake</option>
            <option value='Pure Veg'>Pure Veg 1</option>
            <option value='Pasta'>Pasta</option>
            <option value='Noodles'>Noodles</option>
          </select>
        </div>
        <div className='flex-col add-price'>
          <p> Add Price </p>
          <input onChange={handlechange} value={data.price} className='lamba' type='number' name='price' placeholder='Price' required />
        </div>
        <button onClick={handleSubmit} type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Add