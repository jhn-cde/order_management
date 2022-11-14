import AppRouter from "./AppRouter";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/productsSlice";
import { useEffect } from "react";
import { fetchOrders } from '../../actions/ordersSlice';

function App() {
  const dispatch = useDispatch()

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
