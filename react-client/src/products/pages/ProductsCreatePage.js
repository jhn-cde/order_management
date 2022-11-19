import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createProduct } from "../../api/products"
import { ProductForm } from "../components/ProductForm"

export const ProductsCreatePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (product) => {
    //validate Name
    if(product.Name===''){
      alert('Please enter a valid name')
      return
    }
    if(product.Category===''){
      alert('Please enter a valid Category')
      return
    }
    
    dispatch(createProduct(product))
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