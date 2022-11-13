import React, {useMemo} from 'react'
import { useNavigate, useParams, Link } from "react-router-dom"
import ProductsTable from "../components/ProductsTable"
import { selectOrders } from '../actions/ordersSlice';
import { getOrderByNumber } from '../utils/getOrderByNumber';
import { useAppSelector } from '../hooks';


const EditOrderScreen = () => {
  const {orderid} = useParams()
  const ordersList = useAppSelector(selectOrders)

  const order = useMemo(() => getOrderByNumber(ordersList, orderid), [orderid, ordersList])
  
  const navigate = useNavigate()
  const handleReturn = () => {
    navigate(-1)
  }

  const deleteProduct = (productid) => {}
  
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

      <div>
        <ProductsTable 
          productsList={order.products}
          actions={[{name: 'Delete', action: deleteProduct}]}
        />
        <div className='d-flex justify-content-end mb-4'>
          <Link to={`/products`} className='btn btn-primary'>
            Add Item+
          </Link>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <div className="col-sm-3">
          <table className="table table-borderless table-sm">
            <tbody>
              <tr>
                <td className="fw-bold">Subtotal</td>
                <td className="text-end">${order.Subtotal}</td>
              </tr>
              <tr>
                <td className="fw-bold">Taxes</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table className="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Total City Tax</td>
                        <td className="text-end">${order.Taxes&&order.Taxes.CityTax}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Total County Tax</td>
                        <td className="text-end">${order.Taxes&&order.Taxes.CountyTax}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Total State Tax</td>
                        <td className="text-end">${order.Taxes&&order.Taxes.StateTax}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Total Federal Tax</td>
                        <td className="text-end">${order.Taxes&&order.Taxes.FederalTax}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td className="fw-bold">Total Taxes</td>
                <td className="text-end">${order.TotalTaxes&&order.TotalTaxes}</td>
              </tr>
              <tr>
                <td className="fw-bold">Total</td>
                <td className="text-end">${order.Total&&order.Total}</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <button onClick={handleReturn} className='btn btn-success'>
              Complete Order
            </button>

            <button onClick={handleReturn} className='btn btn-danger'>
              Reject Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditOrderScreen