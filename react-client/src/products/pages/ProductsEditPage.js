import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchProduct } from "../../api/products"
import { editProduct, selectProduct } from "../actions/productsSlice"
import { ProductForm } from "../components/ProductForm"

export const ProductsEditPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { productid } = useParams()

  const product = useSelector(selectProduct)

  useEffect(() => {
    dispatch(fetchProduct({id: productid}))
  }, [dispatch, productid], product)

  const onSubmit = (editedProduct) => {
    dispatch(editProduct({id:productid, toUpdate:{
      Name: editedProduct.Name,
      Category: editedProduct.Category,
      Price: editedProduct.Price,
      Status: editedProduct.Status
    }}))
    dispatch(fetchProduct({id: productid}))
    navigate(-1)
  }

  if(!product){
    return <div className="Edit">Loading...</div>;
  }

  return(
    <div className='create product'>
      <ProductForm
        prod={product}
        onSubmit={onSubmit}
        title={`Edit Product id ${productid}`}
      />
    </div>
  )
}
