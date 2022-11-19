import React from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import OrdersScreen from '../orders/OrdersScreen'
import EditOrderScreen from '../orders/EditOrderScreen'
import CreateOrderScreen from '../orders/CreateOrderScreen'
import Navbar from '../ui/Navbar'
import ProductsScreen from '../products/ProductsScreen'
import CreateProductScreen from '../products/CreateProductScreen'
import EditProductScreen from '../products/EditProductScreen'

const AppRouter = () => {
  return(
    <HashRouter>
      <div className='container mt-3'>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Navigate to="/orders" />}/>

          <Route exact path="/orders" element={<OrdersScreen />}/>
          <Route exact path="/orders/:orderid" element={<EditOrderScreen />}/>
          <Route exact path="/orders/create" element={<CreateOrderScreen />}/>
          
          <Route exact path="/products" element={<ProductsScreen />}/>
          <Route exact path="/products/:productid" element={<EditProductScreen />}/>
          <Route exact path="/products/create" element={<CreateProductScreen />}/>
        </Routes>
      </div>
    </HashRouter>
  )
}

export default AppRouter