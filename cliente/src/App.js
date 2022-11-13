import AppRouter from "./AppRouter";
import { useAppDispatch } from "./hooks";
import { initProducts } from "./actions/productsSlice";
import { useEffect } from "react";
import { initOrders } from './actions/ordersSlice';
import axios from 'axios'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    axios.get('/api/product/getproducts').then(res => {
      //console.log('app products',res.data)
      dispatch(initProducts(res.data))
    }).catch(err => {
      console.log(err)
    })

    axios.get('/api/order/getorders').then(res => {
      console.log('app orders',res.data)
      dispatch(initOrders(res.data))
    }).catch(err => {
      console.log(err)
    })
  }, [dispatch])

  return (
    <div className="App">
        <AppRouter />
    </div>
  );
}

export default App;
