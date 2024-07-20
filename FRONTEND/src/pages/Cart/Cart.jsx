/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import './Cart.css'
import { SharedContext } from '../../Context/SharedContext'
import { Link, useNavigate } from 'react-router-dom'
const Cart = () => {
  const { food_list, cartitems, setCartitems, addtocart, removefromcart, gettotalamount,URL } = useContext(SharedContext)
  const navigate = useNavigate();
  return (
    <>
      {gettotalamount() === 0
        ? <div className='empty-cart'>
          <h2>Your Cart is Empty</h2>
          <Link to="/">Explore Menu</Link>
        </div>
        : <div className='cart'>
          <div className='cart-items'>
            <div className='cart-items-title'>
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, i) => {
              if (cartitems[item._id]) {
                return (
                  <>
                    <div key={item._id} className='cart-items-title cart-items-item'>
                      <img src={URL+"/images/"+item.image} />
                      <p>{item.name}</p>
                      <p>$ {item.price}</p>
                      <p>{cartitems[item._id]}</p>
                      <p>$ {item.price * cartitems[item._id]}</p>
                      <p onClick={() => removefromcart(item._id)} className='X'>X</p>
                    </div>
                    <hr />
                  </>
                )
              }
            })}
          </div>

          <div className='cart-bottom'>
            <div className='cart-total'>
              <h2>Cart Total</h2>
              <div>
                <div className='cart-total-detail'>
                  <p>Sub-total</p>
                  <p>$ {gettotalamount()}</p>
                </div>
                <hr />
                <div className='cart-total-detail'>
                  <p>Delivery Fee</p>
                  <p>{0}</p>
                </div>
                <hr />
                <div className='cart-total-detail'>
                  <p>Total</p>
                  <p>$ {gettotalamount()}</p>
                </div>
                <hr />
              </div>
              <button onClick={() => navigate('/order')} >Proceed To CheckOut</button>
            </div>
          </div>
        </div>}
    </>
  )
}

export default Cart