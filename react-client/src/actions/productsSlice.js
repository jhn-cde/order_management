import { createSlice } from "@reduxjs/toolkit"
import api from "./api"

const initialState = {
  list: [],
  slice: [],
  status: 'idle'
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload
    },
    setSlice: (state, action) => {
      state.slice = action.payload
    },
    create: (state, action) => {
      state.list = [...state.list, action.payload]
      api.post('/api/product/addproduct', action.payload)
      .then(res => {
        alert(res.data)
      })
      .then(err => {
        console.log(err)
      })
    },
    edit: (state, action) => {
      api.post('/api/product/editproduct', action.payload)
      .then(res => {
        alert(res.data)
      })
      .then(err => {
        console.log(err)
      })
    },
    deleteProduct: (state, action) => {
      api.post('/api/product/deleteproduct', action.payload)
      .then(res => {
        alert(res.data)
      })
      .then(err => {
        console.log(err)
      })
    }
  },
})

export const {
  create, 
  edit, 
  setProducts,
  setSlice, 
  deleteProduct} = productsSlice.actions

export function fetchProducts() {
  return async (dispatch) => {
    api
      .get('/api/product/getproducts')
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((err) => {
        console.log('fetchproducts', err)
        dispatch(setProducts([]));
      });
  };
}
export function fetchSlice({page, rowsPerPage, searchtext}) {
  return async (dispatch) => {
    api
      .get('/api/product/getproductsslice', {
        params: {page, rowsPerPage, searchtext}})
      .then((response) => {
        dispatch(setSlice(response.data));
      })
      .catch((err) => {
        console.log('fetchproductsslice', err)
        dispatch(setSlice([]));
      });
  };
}

export const selectProducts = (state) => state.products.list
export const selectSlice = (state) => state.products.slice

export default productsSlice.reducer