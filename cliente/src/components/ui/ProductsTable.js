import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSlice, selectSlice } from "../../actions/productsSlice"
import Pagination from "./Pagination"

const ProductsTable = ({productsList, actions, rowsPerPage=5}) => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const slice = useSelector(selectSlice)

  useEffect(() => {
    dispatch(fetchSlice({page:page-1, rowsPerPage}))
  }, [page, rowsPerPage, dispatch]);
  
  if(slice.length===0){
    return <div className="Edit order">Loading...</div>;
  }
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope='col'>N°</th>
            <th scope='col'>Name</th>
            <th scope='col'>Category</th>
            <th scope='col'>Price</th>
            <th scope='col'>Status</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            slice.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.Name}</td>
                  <td>{product.Category}</td>
                  <td>{product.Price}</td>
                  <td>{product.Status}</td>
                  <td>
                    {actions.map(action => 
                      <li
                        key={action.name}
                        onClick={() => action.action(product.id)}
                        className='btn btn-link'>{action.name}
                      </li>)}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className='d-flex justify-content-end mb-3'>
        <Pagination itemList={productsList} setPage={setPage} rowsPerPage={rowsPerPage}/>
      </div>
    </div>
  )
}

export default ProductsTable