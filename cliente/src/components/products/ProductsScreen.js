import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, selectProducts } from '../../actions/productsSlice';
import ProductsTable from '../ui/ProductsTable';
import { useDispatch, useSelector } from "react-redux";
import { calculateRange, sliceData } from '../../utils/divideList';

const rowsPerPage = 4
const ProductsScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productsList = useSelector(selectProducts)

  const [page, setPage] = useState(1)
  const [slice, setSlice] = useState([])
  const [range, setRange] = useState([])

  useEffect(() => {
    const range = calculateRange(productsList, rowsPerPage)
    setRange([...range])
    const slice = sliceData(productsList, rowsPerPage, page);
    setSlice([...slice]);
  }, [productsList, page]);

  const editProd = (id) => {
    navigate(`/products/${id}`)
  }
  const deleteProd = (id) => {
    dispatch(deleteProduct({id}))
  }
  return(
    <div className='ProductsScreen'>
      <h1 className='mt-3'>Products</h1>
      <div className='d-flex justify-content-end mb-4'>
        <Link to={`/products/create`} className='btn btn-primary'>
          Create Product
        </Link>
      </div>
      <div style={{height: 300}}>
        <ProductsTable 
          productsList={slice}
          actions={[
            {name: 'Edit', action: editProd},
            {name: 'Delete', action: deleteProd}
          ]}
        />
      </div>
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

export default ProductsScreen