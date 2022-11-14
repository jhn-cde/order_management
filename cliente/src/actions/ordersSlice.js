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
    setOrders: (state, action) => {
      state.list = action.payload
    },
    createOrder: (state, action) => {
      state.list = [...state.list, action.payload]
      axios.post('/api/norder/addorder', action.payload)
      .then(res => {
        alert(res.data)
      })
      .then(err => {
        console.log('error addorder', err)
      })
    },
    completeOrder: (state, action) => {
      state.list = state.list.map(item => {
        item.Status = item.Number === action.payload.Number
          ? 'Completed'
          :item.Status
          return item
        }
      )
    },
    rejectOrder: (state, action) => {
      state.list = state.list.map(item => {
        item.Status = item.Number === action.payload.Number
          ? 'Rejected'
          :item.Status
          return item
        }
      )
    },
    deleteOrderProduct: (state, action) => {
      state.list = state.list.map(item => {
        if(item.Number === action.payload.Number){
          item.products = item.products.filter(product => product.id !== action.payload.productid)
        }
        return item
      })
    }
  }
})

export const {createOrder, setOrders, completeOrder, rejectOrder, deleteOrderProduct} = ordersSlice.actions

export function fetchOrders() {
  return async (dispatch) => {
    axios
      .get('/api/norder/getorders')
      .then((response) => {
        dispatch(setOrders(response.data));
      })
      .catch((err) => {
        console.log('fetchorders', err)
        dispatch(setOrders([]));
      });
  };
}

export const selectOrders = (state) => state.orders.list

export default ordersSlice.reducer