import React from 'react'
import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { OrdersRouter } from "../orders/router/OrdersRouter"
import Navbar from "../components/Navbar"
import { ProductsRouter } from "../products/router/ProductsRouter"

export const AppRouter = () => {
  return(
    <HashRouter>
      <Navbar />
      <div className='container mt-3'>
        <Routes>
          <Route exact path="/" element={<Navigate to="/orders" />}/>
          <Route exact path="/orders/*" element={<OrdersRouter />}/>
          <Route exact path="/products/*" element={<ProductsRouter />}/>
        </Routes>
      </div>
    </HashRouter>
  )
}