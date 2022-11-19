import { TableContainer } from "../../components/TableContainer"

export const ItemsTable = ({ deleteProduct, editProduct, order }) => {
  if(!order || order.products.length === 0){
    return(<span>Loading...</span>)
  }
  return(
    <TableContainer
      setPage={() => {}}
      range={[]}
      page={1}
    >
      <thead>
        <tr>
          <th scope='col'>N°</th>
          <th scope='col'>Name</th>
          <th scope='col'>Quantity</th>
          <th scope='col'>Unit Price</th>
          <th scope='col'>Cost</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
        order.products.map(product => {
          return (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.Name}</td>
              <td>{product.Quantity}</td>
              <td>${product.Unitprice}</td>
              <td>${product.Unitprice*product.Quantity}</td>
              <td>
                <li
                  onClick={editProduct}
                  className='btn btn-link btn-sm p-0 me-1'>Edit
                </li>
                <li
                  onClick={() => deleteProduct(product.id)}
                  className='btn btn-link btn-sm p-0'>Delete
                </li>
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </TableContainer>
  )
}