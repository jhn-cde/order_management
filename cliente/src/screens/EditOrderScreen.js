import React, {useMemo} from 'react'
import { useNavigate, useParams, Link } from "react-router-dom"
import { completeOrder, rejectOrder, deleteOrderProduct, selectOrders } from '../actions/ordersSlice';
import { getOrderByNumber } from '../utils/getOrderByNumber';
import { useAppDispatch, useAppSelector } from '../hooks';


const EditOrderScreen = () => {
  const { orderid } = useParams()
  const ordersList = useAppSelector(selectOrders)
  const order = useMemo(() => getOrderByNumber(ordersList, orderid), [orderid, ordersList])
  
  //handle return
  const navigate = useNavigate()
  const handleReturn = () => {
    navigate(-1)
  }

  //dispatcher
  const dispatch = useAppDispatch() 

  const deleteProduct = (productid) => {
    dispatch(deleteOrderProduct({
      Number: Number(orderid), 
      productid: Number(productid)
    }))
  }
  const complete = () => {
    dispatch(completeOrder({Number: Number(orderid)}))
  }

  const reject = () => {
    dispatch(rejectOrder({Number: Number(orderid)}))
  }

  return(
    <div className="mb-4">
      <div className="row mt-4">
        <div className="d-flex justify-content-between">
          <h2>Order N°{orderid}</h2>
          <div>
            <button onClick={handleReturn} className='btn btn-secondary'>
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="col-sm-4">
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td>Customer</td>
              <td>{order.Consumer}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{order.Status}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{order.Date}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='row'>
        <div className='col mb-5'>        
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope='col'>N°</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Unit Price</th>
                <th scope='col'>Cost</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                order.products.map(product => {
                  return (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.Name}</td>
                      <td>{product.Quantity}</td>
                      <td>${product.Unitprice}</td>
                      <td>${product.Unitprice*product.Quantity}</td>
                      <td>
                        <p
                          onClick={() => deleteProduct(product.id)}
                          className='btn btn-link'>Delete
                        </p>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <div className='d-flex justify-content-end mb-4'>
            <Link to={`/products`} className='btn btn-primary'>
              Add Item+
            </Link>
          </div>
        </div>

        <div className="col-lg-4 d-flex justify-content-end">
          <div className="">
            <ul className='list-group mb-4'>
              <li className='list-group-item d-flex justify-content-between align-items-center'>
                Subtotal <span className="badge text-dark">${order.Subtotal}</span>
              </li>
              <li className='list-group-item align-items-center'>
                Taxes
                <ul className='list-group' style={{fontSize: '0.9em'}}>
                  <li className='list-group-item d-flex justify-content-between align-items-center'>
                    Total City Tax <span className="badge text-dark">${order.Taxes.CityTax}</span>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center'>
                    Total County Tax <span className="badge text-dark">${order.Taxes.CountyTax}</span>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center'>
                    Total State Tax <span className="badge text-dark">${order.Taxes.StateTax}</span>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center'>
                    Total Federal Tax <span className="badge text-dark">${order.Taxes.FederalTax}</span>
                  </li>
                </ul>
              </li>
              <li className='list-group-item d-flex justify-content-between align-items-center'>
                Total Taxes <span className="badge text-dark">${order.TotalTaxes}</span>
              </li>
              <li className='list-group-item d-flex justify-content-between align-items-center'>
                Total <span className="badge text-dark">${order.Total}</span>
              </li>
            </ul>
            <div className="d-flex justify-content-around mb-3">
              <button onClick={() => complete({Number: order.Number})} className='btn btn-success btn-sm me-2'>
                Complete Order
              </button>

              <button onClick={reject} className='btn btn-danger btn-sm'>
                Reject Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditOrderScreen