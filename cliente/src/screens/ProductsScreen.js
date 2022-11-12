import React from 'react'
import { Link } from 'react-router-dom';

const productsList = [
  {
    id: 1,
    Name: 'Chocolate',
    Category: 'Candy',
    Price: 10,
    Status: 'Active' 
  },
  {
    id: 2,
    Name: 'Chocolate chip cookie',
    Category: 'Cookies',
    Price: 5,
    Status: 'Inactive' 
  },
  {
    id: 3,
    Name: 'Chocolate cake',
    Category: 'Cakes',
    Price: 25,
    Status: 'Active' 
  },
]

const ProductsScreen = () => {
  return(
    <div className='ProductsScreen'>
      <h1 className='mt-3'>Products</h1>
      <div className='d-flex justify-content-end mb-4'>
        <Link to={`/products`} className='btn btn-primary'>
          Create Product
        </Link>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope='col'>N°</th>
            <th scope='col'>Name</th>
            <th scope='col'>Category</th>
            <th scope='col'>Price</th>
            <th scope='col'>Status</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            productsList.map(product => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.Name}</td>
                  <td>{product.Category}</td>
                  <td>{product.Price}</td>
                  <td>{product.Status}</td>
                  <td>
                    <Link
                      to={'/products'}//`/edit/${user.idUser}`}
                    >
                      <li className='btn btn-link'>Edit</li>
                    </Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className='d-flex justify-content-end mb-3'>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><button className="page-link" >Previous</button></li>
            <li className="page-item"><button className="page-link" >1</button></li>
            <li className="page-item"><button className="page-link" >2</button></li>
            <li className="page-item"><button className="page-link" >3</button></li>
            <li className="page-item"><button className="page-link" >Next</button></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default ProductsScreen