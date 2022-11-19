import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  page: 1,
  rowsPerPage: 1
}

export const ordersPageSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {
    setOrdersSlice: (state, action) => {
      state.list = action.payload
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
  setOrdersSlice,
  setOrdersPage,
  setOrdersRowsPerPage
} = ordersPageSlice.actions

export const selectOrdersSlice = (state) => state.ordersSlice.list
export const selectOrdersPage = (state) => state.ordersSlice.page
export const selectOrdersRowsPerPage = (state) => state.ordersSlice.rowsPerPage

export const ordersSliceReducer = ordersPageSlice.reducer