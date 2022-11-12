import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductsScreen from './screens/ProductsScreen'
import OrdersScreen from './screens/OrdersScreen'
import OrderScreen from './screens/OrderScreen'
import Navbar from './components/Navbar'

const AppRouter = () => {
  return(
    <BrowserRouter>
      <div className='container mt-3'>
        <Navbar />
        <Routes>
          <Route path="/" element={<OrdersScreen />}/>
          <Route path="/orders" element={<OrdersScreen />}/>
          <Route path="/products" element={<ProductsScreen />}/>
          <Route path="/orders/:orderid" element={<OrderScreen />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default AppRouter