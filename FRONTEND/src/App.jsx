/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import In from './components/In/In'
import MyOrders from './pages/MyOrders/MyOrders'
import { SharedContext } from './Context/SharedContext'
import axios from 'axios'

const App = () => {
  const { URL, token, setToken } = useContext(SharedContext)

  const [showin, setShowin] = useState(false)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post(`${URL}/api/user/verify`, {}, { headers: { token } });
        if (!res.data.success) {
          setShowin(true);
          setToken("");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error(error);
      }
    }

    verifyToken();
  }, []);

  return (
    <>
    {showin && <In setShowin={setShowin} />}
      <div className='app'>
        <Navbar setShowin={setShowin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
