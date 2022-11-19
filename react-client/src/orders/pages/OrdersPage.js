import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setOrdersRowsPerPage } from "../actions/ordersSlice"
import { OrdersTable } from "../components/OrdersTable"

export const OrdersPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  dispatch(setOrdersRowsPerPage(4))
  
  return(
    <div className="row mt-5">
      <div className="col">
        <div className="row mb-3">
          <div className="col">
            <h1 className=''>
              Orders
            </h1>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col d-flex justify-content-end">
            <Link to={`/orders/create`} className='btn btn-primary'>
              + Create Order
            </Link>
          </div>
        </div>
        <div className="row mb-4">
          <OrdersTable
            actions={[{
              name: 'Edit',
              action: (id) => navigate(`/orders/${id}`)
            }]}
          />
        </div>
      </div>
    </div>
  )
}