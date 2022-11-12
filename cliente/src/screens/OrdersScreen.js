import { Link } from 'react-router-dom';

const ordersList = [
  {
    id: 1,
    Consumer: 'Joe Smith',
    Status: 'Pending',
    Date: '05/02/2021',
    Total: 127.23 
  },
  {
    id: 2,
    Consumer: 'Joe Baker',
    Status: 'Completed',
    Date: '05/02/2021',
    Total: 50.00
  },
  {
    id: 3,
    Consumer: 'Joe Adams',
    Status: 'Rejected',
    Date: '05/01/2021',
    Total: 200.50 
  },
  {
    id: 4,
    Consumer: 'Joseph Evans',
    Status: 'Completed',
    Date: '04/30/2021',
    Total: 100 
  },
]

const OrdersScreen = () => {
  return(
    <div className='ProductsScreen'>
      <h1 className='mt-3'>Orders</h1>
      <div className='d-flex justify-content-end mb-4'>
        <Link to={`/products`} className='btn btn-primary'>
          Create Order
        </Link>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope='col'>N°</th>
            <th scope='col'>Consumer</th>
            <th scope='col'>Status</th>
            <th scope='col'>Date</th>
            <th scope='col'>Total</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            ordersList.map(order => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.Consumer}</td>
                  <td>{order.Status}</td>
                  <td>{order.Date}</td>
                  <td>{order.Total}</td>
                  <td>
                    <Link
                      to={`/orders/${order.id}`}
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

export default OrdersScreen