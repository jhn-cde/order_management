import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, selectProducts } from '../../actions/productsSlice';
import ProductsTable from '../ui/ProductsTable';
import { useDispatch, useSelector } from "react-redux";

const ProductsScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productsList = useSelector(selectProducts)

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
          productsList={productsList}
          rowsPerPage={3}
          actions={[
            {name: 'Edit', action: editProd},
            {name: 'Delete', action: deleteProd}
          ]}
        />
      </div>
    </div>
  )
}

export default ProductsScreen