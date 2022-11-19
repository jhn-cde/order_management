export const AddedItems = ({addedItems, subTotal, setAddedItems, setSubTotal}) => {
  
  const changeQuantity = ({value, productid}) => {
    const addedList = addedItems.map(p => {
      let tmp = {...p}
      tmp.Quantity = productid===tmp.id? value: tmp.Quantity
      return tmp
    })
    setAddedItems(addedList)
    const tmpSubTotal = addedList.reduce((ac, product) => ac + product.Unitprice*product.Quantity, 0)
    setSubTotal(tmpSubTotal)
  }

  const removeProduct = (productid) => {
    const addedList = addedItems.filter(p => p.id !== productid)
    setAddedItems(addedList)
    const subTotal = addedList.reduce((ac, product) => ac + product.Unitprice*product.Quantity, 0)
    setSubTotal(subTotal)
  }
  return(
    <div className="col-auto">
      <ul className="list-group mb-3">
        {addedItems.map((product) => {
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
      <p>SubTotal: ${subTotal}</p>
    </div>
  )
}