import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductsScreen from './screens/ProductsScreen'
import OrdersScreen from './screens/OrdersScreen'
import EditOrderScreen from './screens/EditOrderScreen'
import Navbar from './components/Navbar'
import ProductScreen from './screens/ProductScreen'
import CreateOrderScreen from './screens/CreateOrderScreen'

const AppRouter = () => {
  return(
    <BrowserRouter>
      <div className='container mt-3'>
        <Navbar />
        <Routes>
          <Route path="/" element={<OrdersScreen />}/>
          <Route path="/orders" element={<OrdersScreen />}/>
          <Route path="/products" element={<ProductsScreen />}/>
          <Route path="/orders/:orderid" element={<EditOrderScreen />}/>
          <Route path="/orders/create" element={<CreateOrderScreen />}/>
          <Route path="/products/:productid" element={<ProductScreen />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default AppRouter