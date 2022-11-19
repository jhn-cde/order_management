import { setProducts, setProduct, setProductsSlice } from "../products";
import { api } from "./api";

export const fetchProducts = () => {
  return async (dispatch) => {
    api
      .get('/api/products')
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((err) => {
        console.log('fetchproducts', err)
        dispatch(setProducts([]));
      });
  };
}

export const fetchProduct = ({id}) => {
  return async (dispatch) => {
    api
      .get(`/api/product/${id}`)
      .then((response) => {
        dispatch(setProduct(response.data));
      })
      .catch((err) => {
        console.log('fetch product', err)
        dispatch(setProduct(undefined));
      });
  };
}

export const fetchProductsSlice = ({page, rowsPerPage, searchtext}) => {
  return async (dispatch) => {
    api
      .get('/api/products', {
        params: {skip: page*rowsPerPage, limit: rowsPerPage, search: searchtext}})
      .then((response) => {
        dispatch(setProductsSlice(response.data));
      })
      .catch((err) => {
        console.log('fetchproductsslice', err)
        dispatch(setProductsSlice([]));
      });
  };
}