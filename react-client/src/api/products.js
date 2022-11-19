import { setProducts, setProduct, setProductsCount } from "../products/actions/productsSlice";
import { api } from "./api";

export const fetchProductsCount = () => {
  return async (dispatch) => {
    api
      .get('/api/products/count')
      .then((response) => {
        dispatch(setProductsCount(response.data.count));
      })
      .catch((err) => {
        console.log('get count', err)
        dispatch(setProductsCount(0));
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

export const fetchProducts = ({page, rowsPerPage, searchtext}) => {
  return async (dispatch) => {
    api
      .get('/api/products', {
        params: {skip: page*rowsPerPage, limit: rowsPerPage, search: searchtext}})
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((err) => {
        console.log('fetch products', err)
        dispatch(setProducts(undefined));
      });
  };
}

export const updateProduct = ({id, toUpdate}) => {
  return async (dispatch) => {
    api
      .post(`/api/product/${id}/update`, toUpdate)
      .then((response) => {
        alert(response.data.ans)
        dispatch(setProduct(response.data.order))
      })
      .catch((err) => {
        if(err){
          console.log(err) 
        }
      });
  };
}

export const deleteProduct = (id) => {
  return async (dispatch) => {
    api
      .post(`/api/product/${id}/delete`)
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

export const createProduct = (product) => {
  return async (dispatch) => {
    api
      .post(`/api/product/create`, product)
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