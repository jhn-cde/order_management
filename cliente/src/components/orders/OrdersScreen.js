import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { fetchOrdersSlice, selectOrders, selectSlice } from '../../actions/ordersSlice';
import { useDispatch, useSelector } from "react-redux";
import Pagination from '../ui/Pagination';

const rowsPerPage = 4
const OrdersScreen = () => {
  const dispatch = useDispatch()
  const ordersList = useSelector(selectOrders)
  const [page, setPage] = useState(1)
  const slice = useSelector(selectSlice)

  useEffect(() => {
    dispatch(fetchOrdersSlice({page:page-1, rowsPerPage}))
  }, [page, dispatch]);

  if(slice.length===0){
    return <div className="Edit order">Loading...</div>;
  }

  return(
    <div className='ProductsScreen'>
      <h1 className='mt-3'>Orders</h1>
      <div className='d-flex justify-content-end mb-4'>
        <Link to={`/orders/create`} className='btn btn-primary'>
          Create Order
        </Link>
      </div>
      <div style={{height: 300}}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope='col'>N°</th>
              <th scope='col'>Consumer</th>
              <th scope='col'>Status</th>
              <th scope='col'>Date</th>
              <th scope='col'>Total</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              slice.map((order, index) => {
                return (
                  <tr key={order.Number}>
                    <td>{order.Number}</td>
                    <td>{order.Consumer}</td>
                    <td>{order.Status}</td>
                    <td>{order.Date}</td>
                    <td>${order.Total}</td>
                    <td>
                      <Link
                        to={`/orders/${order.Number}`}
                      >
                        <li className='btn btn-link'>Edit</li>
                      </Link>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div className='d-flex justify-content-end mb-3'>
        <Pagination
          itemList={ordersList} 
          setPage={setPage} 
          rowsPerPage={rowsPerPage} 
        />
      </div>
    </div>
  )
}

export default OrdersScreen