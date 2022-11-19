import { setOrder, setOrders } from "../orders/actions/ordersSlice";
import { api } from "./api";

export const fetchOrders = ({page, rowsPerPage, searchtext}) => {
  return async (dispatch) => {
    api
      .get('/api/orders', {
        params: {skip: page*rowsPerPage, limit: rowsPerPage, search: searchtext}})
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

export const updateOrder = ({id, toUpdate}) => {
  return async (dispatch) => {
    api
      .post(`/api/order/${id}/update`, toUpdate)
      .then((response) => {
        alert(response.data.ans)
        dispatch(setOrder(response.data.order))
      })
      .catch((err) => {
        if(err){
          console.log(err) 
        }
      });
  };
}

export const createOrder = (order) => {
  return async (dispatch) => {
    api
      .post(`/api/order/create`, order)
      .then((response) => {
        alert(response.data)
      })
      .catch((err) => {
        if(err){
          console.log(err) 
        }
      });
  };
}
