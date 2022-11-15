import React from 'react'
import { useNavigate } from "react-router-dom"
import { useForm } from '../../hooks/useForm'

const ProductForm = ({prod, onSubmit, title}) => {
  const navigate = useNavigate()
  const [product, handleInputChange] = useForm(prod)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    //validate Name
    const regName = /^[a-z A-Z]+$/
    if(product.Name==='' || !regName.test(product.Name)){
      alert('Please enter a valid name')
      return
    }
    if(product.Category==='' || !regName.test(product.Category)){
      alert('Please enter a valid Category')
      return
    }

    onSubmit(product)
  }

  const handleReturn = () => {
    navigate(-1)
  }

  return(
    <div className=''>
      <div className="row mt-4 justify-content-center">
        <div className="col-sm-6 ">
          <div className="d-flex justify-content-between mb-4 mt-4">
            <h2>{title}</h2>
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
                min={0}
                value={product.Price}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <select className="form-select" 
                name="Status" 
                value={product.Status} 
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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

export default ProductForm