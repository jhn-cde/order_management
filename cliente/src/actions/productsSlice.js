import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'


const initialState = {
  list: [],
  status: 'idle'
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload
    },
    create: (state, action) => {
      state.list = [...state.list, action.payload]
      axios.post('/api/product/addproduct', action.payload)
      .then(res => {
        alert(res.data)
      })
      .then(err => {
        console.log(err)
      })
    },
    edit: (state, action) => {
      axios.post('/api/product/editproduct', action.payload)
      .then(res => {
        alert(res.data)
      })
      .then(err => {
        console.log(err)
      })
    },
    deleteProduct: (state, action) => {
      axios.post('/api/product/deleteproduct', action.payload)
      .then(res => {
        alert(res.data)
      })
      .then(err => {
        console.log(err)
      })
    }
  },
})

export const {create, edit, setProducts, deleteProduct} = productsSlice.actions

export function fetchProducts() {
  return async (dispatch) => {
    axios
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

export const selectProducts = (state) => state.products.list

export default productsSlice.reducer