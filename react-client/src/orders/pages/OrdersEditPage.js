import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchOrder } from "../../api/orders"
import {} from "../actions/ordersPageSlice"
import { changeOrderStatus, selectOrder, setOrderProducts } from "../actions/ordersSlice"
import { AddedItemsEdit } from "../components/AddedItemsEdit"
import { ItemsTable } from "../components/ItemsTable"
import { OrderDetails } from "../components/OrderDetails"
import { TaxesInfo } from "../components/TaxesInfo"

export const OrdersEditPage = () => {
  const [editItems, setEditItems] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orderid } = useParams()

  const order = useSelector(selectOrder)

  useEffect(() => {
    dispatch(fetchOrder({id: orderid}))
  }, [dispatch, orderid])

  const saveItems = ({addedItems}) => {
    dispatch(setOrderProducts({
      id: Number(orderid),
      products: addedItems
    }))
    dispatch(fetchOrder({id: orderid}))
    setEditItems(false)
  }
  const deleteProduct = (itemid) => {
    const newAddedItems = order.products.filter(
      product => product.id !== itemid)
    
    dispatch(setOrderProducts({
      id: Number(orderid),
      products: newAddedItems
    }))
    dispatch(fetchOrder({id: orderid}))
    setEditItems(false)
  }
  const changeStatus = (status) => {
    dispatch(changeOrderStatus({id: Number(orderid), Status:status}))
    dispatch(fetchOrder({id: orderid}))
  }

  if(!order){
    return <div className="Edit">Loading...</div>;
  }
  return(
    <div className="mb-4 mt-4">
      <div className="row mb-4">
        <div className="col d-flex justify-content-between">
          <h2>Order N°{orderid}</h2>
          <div>
            <button 
              onClick={() => navigate(-1)} 
              className='btn btn-secondary'
            > Back </button>
          </div>
        </div>
      </div>

      <div className='row mb-4'>
        <div className="col-sm-4">
          <OrderDetails order={order} />
        </div>
      </div>

      <div className='row mb-4'>
        <div className='col mb-4'>
          {
          !editItems&&<div>
            <ItemsTable 
              deleteProduct={deleteProduct}
              editProduct={() => setEditItems(true)} 
              order={order}
            />
            <div className='d-flex justify-content-end mb-4'>
              <button 
                onClick={() => setEditItems(true)} 
                className='btn btn-primary'
              > Add Item+ </button>
            </div>
          </div>
          }

          {
          editItems&&
          <>
            <div className="col-4 m-auto mb-4">
              <hr className="divider"></hr>
            </div>
            <AddedItemsEdit 
              order={order}
              onSave={saveItems}
            />
          </>
          } 
        </div>
        <div className='col-lg-4 mb-4 d-flex justify-content-end'>
          <TaxesInfo
            order={order} 
            complete={() => changeStatus('Completed')} 
            reject={() => changeStatus('Rejected')} />
        </div>
      </div>
    </div>
  )
}