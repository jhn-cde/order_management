import React, {useMemo} from 'react'
import { useParams } from "react-router-dom"
import { selectProducts, edit, fetchProducts } from '../../actions/productsSlice'
import { useDispatch, useSelector } from "react-redux";
import getProductById from '../../utils/getProductById'
import ProductForm from './ProductForm';

const EditProductScreen = () => {
  const dispatch = useDispatch()
  const { productid } = useParams()

  const productsList = useSelector(selectProducts)
  const prod = useMemo(() => getProductById(productsList, productid), [productid, productsList])

  const onSubmit = (product) => {
    dispatch(edit(product))
    dispatch(fetchProducts())
  }

  if(!prod){
    return <div className="Edit">Loading...</div>;
  }

  return(
    <div className='create product'>
      <ProductForm
        prod={prod}
        onSubmit={onSubmit}
        title={'New Product'}
      />
    </div>
  )
}

export default EditProductScreen