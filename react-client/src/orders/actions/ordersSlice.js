import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: undefined,
  order: undefined,
  count: 0,
  page: 1,
  rowsPerPage: 0
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
    setOrdersCount: (state, action) => {
      state.count = action.payload
    },
    setOrdersPage: (state, action) => {
      state.page = action.payload
    },
    setOrdersRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload
    }
  }
})

export const {
  setOrders,
  setOrder,
  setOrdersCount,
  setOrdersPage,
  setOrdersRowsPerPage
} = ordersSlice.actions

export const selectOrders = (state) => state.orders.list
export const selectOrder = (state) => state.orders.order
export const selectOrdersPage = (state) => state.orders.page
export const selectOrdersCount = (state) => state.orders.count
export const selectOrdersRowsPerPage = (state) => state.orders.rowsPerPage

export const ordersReducer = ordersSlice.reducer