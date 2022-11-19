import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../api/products"
import { selectProducts } from "../../products/actions/productsSlice"
import { ProductsTable } from "../../products/components/ProductsTable"
import { AddedItems } from "./AddedItems"

export const AddedItemsEdit = ({children, order, onSave}) => {
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()
  const [addedItems, setAddedItems] = useState(order.products)
  const [subTotal, setSubTotal] = useState(order.Subtotal)
  
  useEffect(() => {
    if(!products || products.length===0){
      dispatch(fetchProducts())
    }
  }, [dispatch, products])
  
  const addItem = (productid) => {
    const product = products.find(p => p.id === productid)
    const toadd = {
      id: productid,
      Name: product.Name,
      Quantity: 1,
      Unitprice: product.Price
    }

    setSubTotal(subTotal + product.Price)
    setAddedItems([...addedItems, toadd])
  }

  return(
    <div className="col me-5">
      <div className="row d-flex justify-content-between mb-4">
        {
          children&&
          <div className="col-auto">
            {children}
          </div>
        }
        <div className="col-auto">
          <h3>Added products</h3>
          <AddedItems
            addedItems={addedItems}
            subTotal={subTotal}
            setAddedItems={setAddedItems}
            setSubTotal={setSubTotal}
          />
        </div>
      </div>
      <div className="row">
        <h3>Products</h3>
        <table className="table table-striped mb-4">
          <ProductsTable
            actions={[{
              name: 'Add',
              action: addItem
            }]}
            products={
              products.filter(p => 
                !addedItems.find(added => 
                  added.id === p.id
                ) && p.Status==='Active'
              )
            }
          />
        </table>
        <div className="d-flex justify-content-end">
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => onSave({subTotal, addedItems})}
          > Save </button>
        </div>
      </div>
    </div>
  )
}