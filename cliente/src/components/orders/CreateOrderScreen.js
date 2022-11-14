import { useForm } from "../../hooks/useForm"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, fetchOrders, selectOrders } from "../../actions/ordersSlice";
import AddItems from "../ui/AddItems";


const CreateOrderScreen = () => {
  const [order, handleInputChange] = useForm({
    Status: 'Pending',
    Date: new Date(),
    Consumer: '',
  })

  const dispatch = useDispatch()

  const ordersList = useSelector(selectOrders)

  // create new order
  const handleSubmit = ({products, Subtotal}) => {
    console.log(ordersList.length)
    const newOrder = {
      ...order,
      Number: ordersList.length!==0?Math.max(...ordersList.map(o => o.Number))+1:1,
      products,
      Subtotal,
      Date: order.Date.toLocaleDateString()
    }
    dispatch(createOrder(newOrder))
    dispatch(fetchOrders())
  }

  return(
    <div className="">
      <div className="">
        <h1 className="mt-4">New Order</h1>
        <AddItems onSaveItems={handleSubmit}>
          <div className="col-md-6">
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
            <div className="mb-3 d-flex justify-content-between">
              <div className="me-4">
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

              <div className="ms-4">
                <DatePicker
                  selected={order.Date}
                  onChange={(date) => handleInputChange({target: {name: 'Date', value: new Date(date)}})}
                />
              </div>
            </div>
          </div>
        </AddItems>
      </div>
    </div>
  )
}

export default CreateOrderScreen