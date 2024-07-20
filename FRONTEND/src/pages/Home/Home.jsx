/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {
  const [category, setCategory] = useState("all");
  return (
    <div>
        <Header />
        <ExploreMenu c={category} set={setCategory} />
        <FoodDisplay c={category} />
    </div>
  )
}

export default Home