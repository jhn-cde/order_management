import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { fetchOrders } from '../../api/orders'
import { OrdersEditPage } from '../pages/OrdersEditPage'
import { OrdersPage } from '../pages/OrdersPage'

export const OrdersRouter = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])
  
  return(
    <Routes>
      <Route exact path="/" element={<OrdersPage />}/>
      <Route exact path="/:orderid" element={<OrdersEditPage />}/>
    </Routes>
  )
}
