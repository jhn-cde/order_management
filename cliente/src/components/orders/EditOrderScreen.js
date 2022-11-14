import React, {useMemo, useState} from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { deleteOrderProduct, selectOrders, fetchOrders, changeOrderStatus, addOrderProduct } from '../../actions/ordersSlice';
import { getOrderByNumber } from '../../utils/getOrderByNumber';
import { useDispatch, useSelector } from "react-redux";
import AddItems from '../ui/AddItems';
import Taxes from '../ui/Taxes';

const EditOrderScreen = () => {
  const [addItems, setAddItems] = useState(false)
  const dispatch = useDispatch() 
  const navigate = useNavigate()

  const { orderid } = useParams()
  const ordersList = useSelector(selectOrders)
  const order = useMemo(() => getOrderByNumber(ordersList, orderid), [orderid, ordersList])
  
  //handle return
  const handleReturn = () => {
    navigate(-1)
  }

  const saveItems = ({products, Subtotal}) =>{
    setAddItems(!addItems)
    dispatch(addOrderProduct({
      Number: Number(orderid),
      products
    }))
    dispatch(fetchOrders())
  }

  //dispatcher
  const deleteProduct = (productid) => {
    dispatch(deleteOrderProduct({
      Number: Number(orderid), 
      productid: Number(productid)
    }))
    dispatch(fetchOrders())
  }
  const complete = () => {
    dispatch(changeOrderStatus({Number: Number(orderid), Status:'Completed'}))
  }
  const reject = () => {
    dispatch(changeOrderStatus({Number: Number(orderid), Status:'Rejected'}))
  }

  if(!order){
    return <div className="Edit order">Loading...</div>;
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
          {// show items 
          !addItems&&
            <>        
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
                <button onClick={() => setAddItems(true)} className='btn btn-primary'>
                    Add Item+
                </button>
              </div>
            </>
          }
        {// edit items 
          addItems&&
          <>
            <hr className="divider"></hr>
            <AddItems onSaveItems={saveItems} products={[...order.products]}/>
          </>
        }
        </div>
        <div className="col-lg-4 d-flex justify-content-end">
          <Taxes order={order} complete={complete} reject={reject} />
        </div>
      </div>
    </div>
  )
}

export default EditOrderScreen