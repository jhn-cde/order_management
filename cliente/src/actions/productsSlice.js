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
    initProducts: (state, action) => {
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
      state.list = state.list.map(item => item.id === action.payload.id? action.payload:item)
    }
  },
})

export const {create, edit, initProducts} = productsSlice.actions

export const selectProducts = (state) => state.products.list

export default productsSlice.reducer