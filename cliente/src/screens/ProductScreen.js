import React, {useMemo} from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { selectProducts, create, edit } from '../actions/productsSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useForm } from '../hooks/useForm'
import getProductById from '../utils/getProductById'

const ProductScreen = () => {
  const productsList = useAppSelector(selectProducts)
  const { productid } = useParams()

  const prod = useMemo(() => getProductById(productsList, productid), [productid, productsList])
  const [product, handleInputChange] = useForm(prod? prod: {  id: Number,
    Name: '',
    Category: '',
    Price: 0,
    Status: 'Active'
  })
  
  const dispatch = useAppDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    if(productid !== '-1'){
      dispatch(edit(product))
      navigate('/products')
    }else{
      const newId = productsList.length+1
      const newProduct = {
        ...product,
        id: newId
      }
      dispatch(create(newProduct))
    }
  }

  const navigate = useNavigate()
  const handleReturn = () => {
    navigate(-1)
  }

  return(
    <div className=''>
      <div className="row mt-4 justify-content-center">
        <div className="col-sm-6 ">
          <div className="d-flex justify-content-between mb-4 mt-4">
            <h2>Product{(productid!=='-1')&&' N°'+productid}</h2>
            <div>
              <button onClick={handleReturn} className='btn btn-secondary'>
                Back
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="pname" className="form-label">Product Name</label>
              <input
                type="text" 
                className="form-control"
                id="pname"
                aria-describedby="aria-describedby"
                name='Name'
                value={product.Name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                type="text" 
                className="form-control" 
                id="category"
                aria-describedby="aria-describedby"
                name='Category'
                value={product.Category}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number" 
                className="form-control" 
                id="price"
                aria-describedby="aria-describedby"
                name='Price'
                value={product.Price}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <input
                type="text" 
                className="form-control" 
                id="status"
                aria-describedby="aria-describedby"
                name='Status'
                value={product.Status}
                onChange={handleInputChange}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen