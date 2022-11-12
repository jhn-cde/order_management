import { Link } from 'react-router-dom';

const ProductsTable = ({productsList}) => {
  return (
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
  )
}

export default ProductsTable