import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { setProductsRowsPerPage } from "../actions/productsSlice"
import { ProductsTableContainer } from "../components/ProductsTableContainer"

export const ProductsPage = () => {
  const dispatch = useDispatch()
  
  dispatch(setProductsRowsPerPage(4))
  
  return(
    <div className="row mt-5">
      <div className="col">
        <div className="row mb-3">
          <div className="col">
            <h1 className=''>
              Products
            </h1>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col d-flex justify-content-end">
            <Link to={`/products/create`} className='btn btn-primary'>
              + Create Product
            </Link>
          </div>
        </div>
        <div className="row mb-4">
          <ProductsTableContainer/>
        </div>
      </div>
    </div>
  )
}