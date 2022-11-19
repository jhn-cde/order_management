import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { fetchProducts } from '../../api/products'
import { ProductsCreatePage } from '../pages/ProductsCreatePage'
import { ProductsEditPage } from '../pages/ProductsEditPage'
import { ProductsPage } from '../pages/ProductsPage'

export const ProductsRouter = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  
  return(
    <Routes>
      <Route exact path="/" element={<ProductsPage />}/>
      <Route exact path="/create" element={<ProductsCreatePage />}/>
      <Route exact path="/:productid" element={<ProductsEditPage />}/>
    </Routes>
  )
}
