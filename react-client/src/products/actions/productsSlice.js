import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: undefined,
  product: undefined,
  count: 0,
  page: 1,
  rowsPerPage: 0
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload
    },
    setProduct: (state, action) => {
      state.product = action.payload
    },
    setProductsCount: (state, action) => {
      state.count = action.payload
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
  setProducts,
  setProduct,
  setProductsCount,
  setProductsPage,
  setProductsRowsPerPage
} = productsSlice.actions

export const selectProducts = (state) => state.products.list
export const selectProduct = (state) => state.products.product
export const selectProductsCount = (state) => state.products.count
export const selectProductsPage = (state) => state.products.page
export const selectProductsRowsPerPage = (state) => state.products.rowsPerPage

export const productsReducer = productsSlice.reducer