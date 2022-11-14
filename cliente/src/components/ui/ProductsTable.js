import { useEffect, useState } from "react"
import { sliceData } from "../../utils/divideList"
import Pagination from "./Pagination"

const ProductsTable = ({productsList, actions, rowsPerPage=5}) => {
  const [page, setPage] = useState(1)
  const [slice, setSlice] = useState([])

  useEffect(() => {
    const slice = sliceData(productsList, rowsPerPage, page);
    setSlice([...slice]);
  }, [productsList, page, rowsPerPage]);

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
                  <td>{(page-1)*rowsPerPage+index+1}</td>
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