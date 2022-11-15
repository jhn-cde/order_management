import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, fetchSlice, selectProducts, selectSlice } from '../../actions/productsSlice';
import ProductsTable from '../ui/ProductsTable';
import { useDispatch, useSelector } from "react-redux";
import Pagination from '../ui/Pagination';

const rowsPerPage = 3
const ProductsScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const slice = useSelector(selectSlice)
  const productsList = useSelector(selectProducts)

  useEffect(() => {
    dispatch(fetchSlice({page:page-1, rowsPerPage}))
  }, [page, dispatch]);
  
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
          slice={slice}
          rowsPerPage={3}
          actions={[
            {name: 'Edit', action: editProd},
            {name: 'Delete', action: deleteProd}
          ]}
        />

        <div className='d-flex justify-content-end mb-3'>
          <Pagination itemList={productsList} setPage={setPage} rowsPerPage={rowsPerPage}/>
        </div>
      </div>
    </div>
  )
}

export default ProductsScreen