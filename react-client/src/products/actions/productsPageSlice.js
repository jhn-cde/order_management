import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  page: 1,
  rowsPerPage: 1
}

export const productsPageSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    setProductsSlice: (state, action) => {
      state.list = action.payload
    },
    setProductsPage: (state, action) => {
      state.page = action.payload
    },
    setProductsRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload
    }
  }
})

export const {
  setProductsSlice,
  setProductsPage,
  setProductsRowsPerPage
} = productsPageSlice.actions

export const selectProductsSlice = (state) => state.productsSlice.list
export const selectProductsPage = (state) => state.productsSlice.page
export const selectProductsrowsPerPage = (state) => state.productsSlice.rowsPerPage

export const productsSliceReducer = productsPageSlice.reducer