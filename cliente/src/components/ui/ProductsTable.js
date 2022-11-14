const ProductsTable = ({productsList, actions}) => {
  return (
    <div>
        <table className="table table-striped">
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
                      {actions.map(action => 
                        <li
                          key={action.name}
                          onClick={() => action.action(product.id)}
                          className='btn btn-link'>{action.name}
                        </li>)}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
    </div>
  )
}

export default ProductsTable