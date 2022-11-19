import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

const initialState = {
  list: [],
  product: undefined
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
    editProduct: (state, action) => {
      api.post(`/api/product/${action.payload.id}/update`, action.payload.toUpdate)
      .then(res => {
        alert(res.data)
      })
      .then(err => {
        if(err){
          console.log(err) 
        }
      })
    },
    createProduct: (state, action) => {
      api.post('/api/product/create', action.payload)
      .then(res => {
        alert(res.data)
      })
      .then(err => {
        if(err){
          console.log(err) 
        }
      })
    },
    deleteProduct: (state, action) => {
      api.post(`/api/product/${action.payload.id}/delete`)
      .then(res => {
        alert(res.data)
      })
      .then(err => {
        if(err){
          console.log(err) 
        }
      })
    }
  }
})

export const {
  setProducts,
  setProduct,
  createProduct,
  deleteProduct,
  editProduct
} = productsSlice.actions

export const selectProducts = (state) => state.products.list
export const selectProduct = (state) => state.products.product

export const productsReducer = productsSlice.reducer