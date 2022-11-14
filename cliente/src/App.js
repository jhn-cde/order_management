import AppRouter from "./AppRouter";
import { useAppDispatch } from "./hooks";
import { fetchProducts } from "./actions/productsSlice";
import { useEffect } from "react";
import { fetchOrders } from './actions/ordersSlice';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchOrders())
  }, [dispatch])

  return (
    <div className="App">
        <AppRouter />
    </div>
  );
}

export default App;
