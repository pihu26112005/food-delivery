/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import './FoodDisplay.css'
import { SharedContext } from '../../Context/SharedContext'
import FoodDisplayItem from '../FoodDisplayItem/FoodDisplayItem';

const FoodDisplay = ({ c }) => {
    const { food_list } = useContext(SharedContext);
    return (
        <div className='food-display' id='food-display' >
            <h2>Top Food Items </h2>
            <div className='food-display-list'>
                {food_list.map((item, i) => {
                    if (c === "all" || c === item.category) {
                        return (
                            <FoodDisplayItem
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay