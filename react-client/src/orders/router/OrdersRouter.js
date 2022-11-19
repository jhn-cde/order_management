import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { OrdersCreatePage } from '../pages/OrdersCreatePage'
import { OrdersEditPage } from '../pages/OrdersEditPage'
import { OrdersPage } from '../pages/OrdersPage'

export const OrdersRouter = () => {
  return(
    <Routes>
      <Route exact path="/" element={<OrdersPage />}/>
      <Route exact path="/create" element={<OrdersCreatePage />}/>
      <Route exact path="/:orderid" element={<OrdersEditPage />}/>
    </Routes>
  )
}
