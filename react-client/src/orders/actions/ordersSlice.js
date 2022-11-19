import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

const initialState = {
  list: [],
  order: undefined
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.list = action.payload
    },
    setOrder: (state, action) => {
      state.order = action.payload
    },
    createOrder: (state, action) => {
      api.post('/api/order/create', action.payload)
      .then(res => {
        alert(res.data)
      })
      .then(err => {
        if(err){
          console.log(err) 
        }
      })
    },
    setOrderProducts: (state, action) => {
      api
      .post(`/api/order/${action.payload.id}/update`, {products: action.payload.products})
      .then((response) => {
        alert(response.data)
      })
      .catch((err) => {
        if(err){
          console.log(err) 
        }
      });
    },
    changeOrderStatus: (state, action) => {
      api
        .post(`/api/order/${action.payload.id}/update`, {Status: action.payload.Status})
        .then((response) => {
          alert(response.data)
        })
        .catch((err) => {
          if(err){
            console.log(err) 
          }
        });
    },
  }
})

export const {
  setOrders,
  setOrder,
  setOrderProducts,
  changeOrderStatus,
  createOrder
} = ordersSlice.actions

export const selectOrders = (state) => state.orders.list
export const selectOrder = (state) => state.orders.order

export const ordersReducer = ordersSlice.reducer