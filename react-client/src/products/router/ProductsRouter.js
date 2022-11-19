import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProductsCreatePage } from '../pages/ProductsCreatePage'
import { ProductsEditPage } from '../pages/ProductsEditPage'
import { ProductsPage } from '../pages/ProductsPage'

export const ProductsRouter = () => {
  return(
    <Routes>
      <Route exact path="/" element={<ProductsPage />}/>
      <Route exact path="/create" element={<ProductsCreatePage />}/>
      <Route exact path="/:productid" element={<ProductsEditPage />}/>
    </Routes>
  )
}
