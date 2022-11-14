import React from 'react'
import { useNavigate } from "react-router-dom"
import { create } from '../../actions/productsSlice'
import { useDispatch } from "react-redux";
import ProductForm from './ProductForm';

const CreateProductScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (product) => {
    dispatch(create(product))
    navigate('/products')
  }

  return(
    <div className='create product'>
      <ProductForm
        prod={{  id: Number,
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