/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './FoodDisplayItem.css'
import { assets } from '../../assets/assets'
import { SharedContext } from '../../Context/SharedContext'

const FoodDisplayItem = ({id,image,name,description,price}) => {
    const {cartitems, addtocart, removefromcart,URL} = useContext(SharedContext)
    return (
        <div className='food-display-item'>
            <div className='food-display-item-img'>
                <img src={URL+"/images/"+image} alt='food' />
                {
                    !cartitems[id] 
                    ? <img className='add' src={assets.add_icon_white} alt='add to cart' onClick={() => addtocart(id)} />
                    : <div  className='food-display-item-quantity'>
                        <img className='b' src={assets.add_icon_green} alt='add' onClick={() => addtocart(id)} />
                        <p>{cartitems[id]}</p>
                        <img className='b' src={assets.remove_icon_red} alt='minus' onClick={() => removefromcart(id)} />
                     </div>
                }
            </div>
            <div className='food-display-item-info'>
                <div className='food-display-item-name-rating'>
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt='rating' />
                </div>
                <p className='food-display-item-description' >{description}</p>
                <p className='food-display-item-price' > $ {price}</p>
            </div>
        </div>
    )
}

export default FoodDisplayItem