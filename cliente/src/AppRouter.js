import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductsScreen from './screens/ProductsScreen'
import OrdersScreen from './screens/OrdersScreen'
import Navbar from './components/Navbar'
const AppRouter = () => {
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<OrdersScreen />}/>
        <Route path="/products" element={<ProductsScreen />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter