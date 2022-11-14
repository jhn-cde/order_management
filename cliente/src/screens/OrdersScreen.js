import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { selectOrders } from '../actions/ordersSlice';
import { useAppSelector } from '../hooks';
import { calculateRange, sliceData } from '../utils/divdeList';

const rowsPerPage = 4
const OrdersScreen = () => {
  const ordersList = useAppSelector(selectOrders)
  const [page, setPage] = useState(1)
  const [slice, setSlice] = useState([])
  const [range, setRange] = useState([])

  useEffect(() => {
    const range = calculateRange(ordersList, rowsPerPage)
    setRange([...range])
    const slice = sliceData(ordersList, rowsPerPage, page);
    setSlice([...slice]);
  }, [ordersList, page]);

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
              slice.map(order => {
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
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {
              range.map(page =>
                <li className="page-item" key={page}>
                  <button
                    className="page-link"
                    onClick={() => setPage(page)}
                  >
                    {page}
                  </button>
                </li> 
              )
            }
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default OrdersScreen