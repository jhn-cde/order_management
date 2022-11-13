import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { selectProducts } from '../actions/productsSlice';
import ProductsTable from '../components/ProductsTable';
import { useAppSelector } from '../hooks';

const ProductsScreen = () => {
  const productsList = useAppSelector(selectProducts)

  const navigate = useNavigate()
  const editProduct = (id) => {
    navigate(`/products/${id}`)
  }
  return(
    <div className='ProductsScreen'>
      <h1 className='mt-3'>Products</h1>
      <div className='d-flex justify-content-end mb-4'>
        <Link to={`/products/${-1}`} className='btn btn-primary'>
          Create Product
        </Link>
      </div>

      <ProductsTable 
        productsList={productsList}
        actions={[{name: 'Edit', action: editProduct}]}
      />
    </div>
  )
}

export default ProductsScreen