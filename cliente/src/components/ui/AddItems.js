
import "react-datepicker/dist/react-datepicker.css";
import ProductsTable from "../ui/ProductsTable";
import { useSelector } from "react-redux";
import { selectProducts } from "../../actions/productsSlice";
import { useState } from "react";


const AddItems = ({children, onSaveItems, products=[]}) => {
  const productsList = useSelector(selectProducts)
  const [addedProducts, setAddedProducts] = useState(products)
  const [subTotal, setSubTotal] = useState(0)

  const addProduct = (productid) => {
    const product = productsList.filter(p => p.id === productid)[0]
    const toadd = {
      id: productid,
      Name: product.Name,
      Quantity: 1,
      Unitprice: product.Price
    }
    
    setSubTotal(subTotal + product.Price)
    setAddedProducts([...addedProducts, toadd])
  }
  
  const changeQuantity = ({value, productid}) => {
    const addedList = addedProducts.map(p => {
      let tmp = {...p}
      tmp.Quantity = productid===tmp.id? value: tmp.Quantity
      return tmp
    })
    setAddedProducts(addedList)
    const tmpSubTotal = addedList.reduce((ac, product) => ac + product.Unitprice*product.Quantity, 0)
    setSubTotal(tmpSubTotal)
  }

  const removeProduct = (productid) => {
    const addedList = addedProducts.filter(p => p.id !== productid)
    setAddedProducts(addedList)
    const subTotal = addedList.reduce((ac, product) => ac + product.Unitprice*product.Quantity, 0)
    setSubTotal(subTotal)
  }

  const onSave = () => {
    onSaveItems({products: addedProducts, Subtotal: subTotal})
  }

  return(
    <div>
      <div className="row d-flex justify-content-between">
        {children}
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
          <p>SubTotal: {subTotal}</p>
        </div>
      </div>

      <div className="mb-3 mt-3">
        <h3>Products</h3>
        <ProductsTable
          slice={productsList.filter(p => !addedProducts.find(added => added.id === p.id))}
          rowsPerPage={3}
          actions={[{name:'Add', action: addProduct}]}
        />
      </div>

      <button 
        className="btn btn-primary btn-lg"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  )
}

export default AddItems