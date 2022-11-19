import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { OrdersRouter } from "../orders/router/OrdersRouter"
import Navbar, {} from "../components/Navbar"

export const AppRouter = () => {
  return(
    <HashRouter>
      <Navbar />
      <div className='container mt-3'>
        <Routes>
          <Route exact path="/" element={<Navigate to="/orders" />}/>
          <Route exact path="/orders/*" element={<OrdersRouter />}/>
        </Routes>
      </div>
    </HashRouter>
  )
}