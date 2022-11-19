import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createProduct, selectProducts } from "../actions/productsSlice"
import { ProductForm } from "../components/ProductForm"

export const ProductsCreatePage = () => {
  const products = useSelector(selectProducts)
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
    
    const newProduct = {
      ...product,
      id: products.length!==0?Math.max(...products.map(o => o.id))+1:1
    }
    dispatch(createProduct(newProduct))
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