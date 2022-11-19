import { setOrdersSlice } from "../orders/actions/ordersPageSlice";
import { setOrder, setOrders } from "../orders/actions/ordersSlice";
import { api } from "./api";

export const fetchOrders = () => {
  return async (dispatch) => {
    api
      .get('/api/orders')
      .then((response) => {
        dispatch(setOrders(response.data));
      })
      .catch((err) => {
        console.log('fetchorders', err)
        dispatch(setOrders([]));
      });
  };
}

export const fetchOrder = ({id}) => {
  return async (dispatch) => {
    api
      .get(`/api/order/${id}`)
      .then((response) => {
        dispatch(setOrder(response.data));
      })
      .catch((err) => {
        console.log('fetchorders', err)
        dispatch(setOrder(undefined));
      });
  };
}

export const fetchOrdersSlice = ({page, rowsPerPage, searchtext}) => {
  return async (dispatch) => {
    api
      .get('/api/orders', {params: {skip: page*rowsPerPage, limit: rowsPerPage, search: searchtext}})
      .then((response) => {
        dispatch(setOrdersSlice(response.data));
      })
      .catch((err) => {
        console.log('fetchordersslice', err)
        dispatch(setOrdersSlice([]));
      });
  };
}