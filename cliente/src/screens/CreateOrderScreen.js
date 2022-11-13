import { useForm } from "../hooks/useForm"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProductsTable from "../components/ProductsTable";
import { useAppSelector, useAppDispatch } from "../hooks";
import { selectProducts } from "../actions/productsSlice";
import { useState } from "react";
import { create, selectOrders } from "../actions/ordersSlice";


const CreateOrderScreen = () => {
  const [order, handleInputChange] = useForm({
    Status: 'Pending',
    Date: new Date(),
    Consumer: '',
    Subtotal: 0,
    products: []
  })

  const dispatch = useAppDispatch()

  const productsList = useAppSelector(selectProducts)
  const ordersList = useAppSelector(selectOrders)

  const [avaiProducts, setAvaiProducts] = useState(productsList)
  const [addedProducts, setAddedProducts] = useState([])

  const addProduct = (productid) => {
    const product = avaiProducts.filter((p) => p.id === productid)[0]
    const products = [...order.products, product]
    handleInputChange({target:{name:'products', value: products}})
    handleInputChange({target:{name:'Subtotal', value:order.Subtotal + product.Price}})
    setAvaiProducts(avaiProducts.filter((p) => p.id !== productid))
    setAddedProducts([...addedProducts, product])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newOrder = {
      ...order,
      Number: Math.max(...ordersList.map(o => o.Number))+1,
      products: addedProducts,
      Date: order.Date.toLocaleDateString()
    }
    dispatch(create(newOrder))
  }

  return(
    <div className="">
      <div className="">
        <h1 className="mt-4">New Order</h1>
        <form onSubmit={handleSubmit}>
          <div className="row d-flex justify-content-between">
            <div className="col-auto">
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
              <ul>
                {addedProducts.map((product) => {
                  return(
                    <li key={product.id}>{`${product.Name} - ${product.Category} - ${product.Price}`}</li>
                )})}
              </ul>
              <p>SubTotal: {order.Subtotal}</p>
            </div>
          </div>

          <div className="mb-3 mt-3">
            <h3>Products</h3>
            <ProductsTable
              productsList={avaiProducts}
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