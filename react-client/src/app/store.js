import { configureStore } from '@reduxjs/toolkit'
import { ordersSliceReducer } from '../orders/actions/ordersPageSlice'
import { ordersReducer } from '../orders/actions/ordersSlice'
import { productsSliceReducer } from '../products/actions/productsPageSlice'
import { productsReducer } from '../products/actions/productsSlice'

export const store = configureStore({
  reducer: {
    ordersSlice: ordersSliceReducer,
    orders: ordersReducer,

    productsSlice: productsSliceReducer,
    products: productsReducer
  }
})