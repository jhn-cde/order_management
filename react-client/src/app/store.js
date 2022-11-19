import { configureStore } from '@reduxjs/toolkit'
import { ordersSliceReducer } from '../orders/actions/ordersPageSlice'
import { ordersReducer } from '../orders/actions/ordersSlice'

export const store = configureStore({
  reducer: {
    ordersSlice: ordersSliceReducer,
    orders: ordersReducer
  }
})