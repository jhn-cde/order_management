import { useForm } from "../hooks/useForm"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProductsTable from "../components/ProductsTable";
import { useAppSelector, useAppDispatch } from "../hooks";
import { selectProducts } from "../actions/productsSlice";
import { useState } from "react";
import { createOrder, fetchOrders, selectOrders } from "../actions/ordersSlice";


const CreateOrderScreen = () => {
  const [order, handleInputChange] = useForm({
    Status: 'Pending',
    Date: new Date(),
    Consumer: '',
    Subtotal: 0,
  })

  const dispatch = useAppDispatch()

  const productsList = useAppSelector(selectProducts)
  const ordersList = useAppSelector(selectOrders)

  const [addedProducts, setAddedProducts] = useState([])

  const addProduct = (productid) => {
    const product = productsList.filter(p => p.id === productid)[0]
    const toadd = {
      id: productid,
      Name: product.Name,
      Quantity: 1,
      Unitprice: product.Price
    }
    
    handleInputChange({target:{name:'Subtotal', value:order.Subtotal + product.Price}})
    setAddedProducts([...addedProducts, toadd])
  }
  
  const changeQuantity = ({value, productid}) => {
    const addedList = addedProducts.map(p => {
      p.Quantity = productid===p.id? value: p.Quantity
      return p
    })
    setAddedProducts(addedList)
    const subTotal = addedList.reduce((ac, product) => ac + product.Unitprice*product.Quantity, 0)
    handleInputChange({target:{name:'Subtotal', value:subTotal}})
  }
  const removeProduct = (productid) => {
    const addedList = addedProducts.filter(p => p.id !== productid)
    setAddedProducts(addedList)
    const subTotal = addedList.reduce((ac, product) => ac + product.Unitprice*product.Quantity, 0)
    handleInputChange({target:{name:'Subtotal', value:subTotal}})
  }

  // create new order
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(ordersList.length)
    const newOrder = {
      ...order,
      Number: ordersList.length!==0?Math.max(...ordersList.map(o => o.Number))+1:1,
      products: addedProducts,
      Date: order.Date.toLocaleDateString()
    }
    dispatch(createOrder(newOrder))
    dispatch(fetchOrders())
  }

  return(
    <div className="">
      <div className="">
        <h1 className="mt-4">New Order</h1>
        <form onSubmit={handleSubmit}>
          <div className="row d-flex justify-content-between">
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

            <div className="col-auto">
              <h3>Added products</h3>
              <ul className="list-group mb-3">
                {addedProducts.map((product) => {
                  return(
                    <li key={product.id} className='list-group-item d-flex justify-content-between'>
                      {`${product.Name} - $${product.Unitprice}`}
                      <div className="d-flex justify-content-between">
                        <div className="input-group ms-3 input-group-sm" style={{width:'110px', height:'25px'}}>                        
                          <input
                            type="number" 
                            style={{height:'25px'}}
                            className="form-control ms-2 me-3"
                            min={1}
                            name='Quantity'
                            value={product.Quantity}
                            onChange={({target}) => changeQuantity({value: target.value, productid: product.id})}
                          />
                        </div>
                        <div>
                          <button
                            className="btn btn-link p-0" 
                            style={{width:20, height:25}}
                            onClick={() => removeProduct(product.id)}>x</button>
                        </div>
                      </div>
                    </li>
                )})}
              </ul>
              <p>SubTotal: {order.Subtotal}</p>
            </div>
          </div>

          <div className="mb-3 mt-3">
            <h3>Products</h3>
            <ProductsTable
              productsList={productsList.filter(p => !addedProducts.find(added => added.id === p.id))}
              actions={[{name:'Add', action: addProduct}]}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateOrderScreen