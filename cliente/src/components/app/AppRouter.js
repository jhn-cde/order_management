import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OrdersScreen from '../orders/OrdersScreen'
import EditOrderScreen from '../orders/EditOrderScreen'
import CreateOrderScreen from '../orders/CreateOrderScreen'
import Navbar from '../ui/Navbar'
import ProductsScreen from '../products/ProductsScreen'
import CreateProductScreen from '../products/CreateProductScreen'
import EditProductScreen from '../products/EditProductScreen'

const AppRouter = () => {
  return(
    <BrowserRouter>
      <div className='container mt-3'>
        <Navbar />
        <Routes>
          <Route path="/" element={<OrdersScreen />}/>

          <Route path="/orders" element={<OrdersScreen />}/>
          <Route path="/orders/:orderid" element={<EditOrderScreen />}/>
          <Route path="/orders/create" element={<CreateOrderScreen />}/>
          
          <Route path="/products" element={<ProductsScreen />}/>
          <Route path="/products/:productid" element={<EditProductScreen />}/>
          <Route path="/products/create" element={<CreateProductScreen />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default AppRouter