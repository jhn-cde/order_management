import React, {useMemo} from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { selectProducts, edit } from '../../actions/productsSlice'
import { useDispatch, useSelector } from "react-redux";
import getProductById from '../../utils/getProductById'
import ProductForm from './ProductForm';

const EditProductScreen = () => {
  const productsList = useSelector(selectProducts)
  const { productid } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const prod = useMemo(() => getProductById(productsList, productid), [productid, productsList])

  const onSubmit = (product) => {
    console.log(product)
    dispatch(edit(product))
    navigate('/products')
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