import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'


const initialState = {
  list: [],
  status: 'idle'
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    initOrders: (state, action) => {
      state.list = action.payload
    },
    create: (state, action) => {
      console.log('addorder', action.payload)
      state.list = [...state.list, action.payload]
      axios.post('/api/order/addorder', action.payload)
      .then(res => {
        console.log(res)
        alert(res.data)
      })
      .then(err => {
        console.log('error addorder', err)
      })
    },
    edit: (state, action) => {
      state.list = state.list.map(item => item.Number === action.payload.Number? action.payload:item)
    },
    deleteProduct: (state, action) => {
      state.list = state.list.map(item => {
        if(item.Number === action.payload.Number){
          item.products = item.products.filter(product => product.id !== action.payload.productid)
        }
        return item
      })
    }
  },
})

export const {create, initOrders} = ordersSlice.actions

export const selectOrders = (state) => state.orders.list

export default ordersSlice.reducer