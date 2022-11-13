import { useEffect, useState } from "react"
import { calculateRange, sliceData } from "../utils/divdeList"

const rowsPerPage = 4

const ProductsTable = ({productsList, actions}) => {
  const [page, setPage] = useState(1)
  const [slice, setSlice] = useState([])
  const [range, setRange] = useState([])

  useEffect(() => {
    const range = calculateRange(productsList, rowsPerPage)
    setRange([...range])
    const slice = sliceData(productsList, rowsPerPage, page);
    setSlice([...slice]);
  }, [productsList, page]);

  return (
    <div style={{height: 300}}>
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
              slice.map(product => {
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
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {
              range.map(page =>
                <li className="page-item" key={page}>
                  <button
                    className="page-link"
                    onClick={() => setPage(page)}
                  >
                    {page}
                  </button>
                </li> 
              )
            }
          </ul>
        </nav>
      </div>
    </div>
      
  )
}

export default ProductsTable