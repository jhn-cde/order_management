import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
  list: [],
  slice: [],
  status: 'idle'
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.list = action.payload
    },
    setSlice: (state, action) => {
      state.slice = action.payload
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
    changeOrderStatus: (state, action) => {
      let order = state.list.find(item => item.Number===action.payload.Number)
      order.Status = action.payload.Status
      axios
        .post('/api/norder/editOrderStatus', order)
        .then((response) => {
          console.log(response.data)
          alert(response.data)
        })
        .catch((err) => {
          console.log('editorderstatus', err)
        });
    },
    deleteOrderProduct: (state, action) => {
      
      let order = state.list.find(item => item.Number===action.payload.Number)
      order.products = order.products.filter(product => product.id !== action.payload.productid)
      axios
        .post('/api/norder/editOrderProducts', order)
        .then((response) => {
          console.log(response.data)
          alert(response.data)
        })
        .catch((err) => {
          console.log('editorderstatus', err)
        });
    },
    addOrderProduct: (state, action) => {
      let order = state.list.find(item => item.Number===action.payload.Number)      
      order.products = [...action.payload.products]

      axios
        .post('/api/norder/editOrderProducts', order)
        .then((response) => {
          console.log(response.data)
          alert(response.data)
        })
        .catch((err) => {
          console.log('editorderstatus', err)
        });
    },
  }
})

export const {
  createOrder, 
  setOrders,
  setSlice,
  changeOrderStatus, 
  deleteOrderProduct, 
  addOrderProduct} = ordersSlice.actions

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
export function fetchOrdersSlice({page, rowsPerPage}) {
  return async (dispatch) => {
    axios
      .get('/api/norder/getordersslice', {
        params: {page, rowsPerPage}})
      .then((response) => {
        dispatch(setSlice(response.data));
      })
      .catch((err) => {
        console.log('fetchordersslice', err)
        dispatch(setSlice([]));
      });
  };
}
export const selectOrders = (state) => state.orders.list
export const selectSlice = (state) => state.orders.slice

export default ordersSlice.reducer