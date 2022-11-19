import { configureStore } from '@reduxjs/toolkit'
import { ordersReducer } from '../orders/actions/ordersSlice'
import { productsReducer } from '../products/actions/productsSlice'

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer
  }
})