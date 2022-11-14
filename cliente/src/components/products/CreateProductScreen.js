import React from 'react'
import { useNavigate } from "react-router-dom"
import { create, selectProducts } from '../../actions/productsSlice'
import { useDispatch, useSelector } from "react-redux";
import ProductForm from './ProductForm';

const CreateProductScreen = () => {
  const productsList = useSelector(selectProducts)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (product) => {
    const newProduct = {
      ...product,
      id: productsList.length!==0?Math.max(...productsList.map(o => o.id))+1:1
    }
    dispatch(create(newProduct))
    navigate('/products')
  }

  return(
    <div className='create product'>
      <ProductForm
        prod={{
          Name: '',
          Category: '',
          Price: 0,
          Status: 'Active'
        }}
        onSubmit={onSubmit}
        title={'New Product'}
      />
    </div>
  )
}

export default CreateProductScreen