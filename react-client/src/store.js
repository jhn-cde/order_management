import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './actions/productsSlice'
import ordersReducer from './actions/ordersSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer
  },
});

