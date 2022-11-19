import { useDispatch, useSelector } from "react-redux"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "../../hooks/useForm"
import { createOrder, selectOrders } from "../actions/ordersSlice"
import { AddedItemsEdit } from "../components/AddedItemsEdit"
import { fetchOrders } from "../../api/orders";

export const OrdersCreatePage = () => {
  const ordersList = useSelector(selectOrders)
  const dispatch = useDispatch()

  const [order, handleInputChange] = useForm({
    Status: 'Pending',
    Date: new Date(),
    Consumer: '',
  })

  const handleSubmit = ({addedItems, subTotal}) => {
    //validate Name
    if(order.Consumer===''){
      alert('Please enter a valid name')
      return
    }
    
    const newOrder = {
      ...order,
      Number: ordersList.length!==0?Math.max(...ordersList.map(o => o.Number))+1:1,
      products: addedItems,
      Subtotal: subTotal,
      Date: order.Date.toLocaleDateString()
    }
    dispatch(createOrder(newOrder))
    dispatch(fetchOrders())
  }

  return(
    <div className="mb-5">
      <h1 className="mt-4">New Order</h1>
      <AddedItemsEdit 
        onSave={handleSubmit}
        order={{...order, products:[], Subtotal: 0}}
      >
        <div className="col-auto me-ms-4 mb-4">
          <div className="mb-3">
            <label htmlFor="consumer" className="form-label">Customer Name</label>
            <input
              type="text" 
              className="form-control"
              id="consumer"
              aria-describedby="aria-describedby"
              name='Consumer'
              value={order.Consumer}
              onChange={handleInputChange}
            />
          </div>
          <div className="row mb-3 d-flex justify-content-between">
            <div className="me-sm-4 col-auto mb-3">
              <select className="form-select" 
                name="Status" 
                value={order.Status} 
                onChange={e => {
                  handleInputChange({target: {name: 'Status', value: e.target.value}})
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="col-auto" >
              <DatePicker
                className="form-control text-center"
                selected={order.Date}
                onChange={(date) => handleInputChange({target: {name: 'Date', value: new Date(date)}})}
              />
            </div>
          </div>
        </div>
      </AddedItemsEdit>
    </div>
  )
}