import { useNavigate, useParams, Link } from "react-router-dom"
import ProductsTable from "../components/ProductsTable"

const order = {
  Number: 1,
  Status: 'Pending',
  Date: '05/02/2021',
  Consumer: 'Joe Smith',
  Subtotal: 100,
  Taxes: {
    CityTax: 10,
    CountyTax: 5.5,
    StateTax: 9.24,
    FederalTax: 2.49
  },
  TotalTaxes: 27.23,
  Total: 127.23,
  products: [
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
}

const OrdersScreen = () => {
  const {orderid} = useParams()
  const navigate = useNavigate()

  const handleReturn = () => {
    navigate(-1)
  }

  return(
    <div className="mb-4">
      <div className="row mt-4">
        <div className="d-flex justify-content-between">
          <h2>Order N°{orderid}</h2>
          <div>
            <button onClick={handleReturn} className='btn btn-secondary'>
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="col-sm-4">
        <table class="table table-borderless">
          <tbody>
            <tr>
              <td>Customer</td>
              <td>{order.Consumer}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{order.Status}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{order.Date}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <ProductsTable productsList={order.products}/>
        <div className='d-flex justify-content-end mb-4'>
          <Link to={`/products`} className='btn btn-primary'>
            Add Item+
          </Link>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <div className="col-sm-3">
          <table class="table table-borderless table-sm">
            <tbody>
              <tr>
                <td className="fw-bold">Subtotal</td>
                <td className="text-end">${order.Subtotal}</td>
              </tr>
              <tr>
                <td className="fw-bold">Taxes</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table class="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Total City Tax</td>
                        <td className="text-end">${order.Taxes.CityTax}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Total County Tax</td>
                        <td className="text-end">${order.Taxes.CountyTax}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Total State Tax</td>
                        <td className="text-end">${order.Taxes.StateTax}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Total Federal Tax</td>
                        <td className="text-end">${order.Taxes.FederalTax}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td className="fw-bold">Total Taxes</td>
                <td className="text-end">${order.TotalTaxes}</td>
              </tr>
              <tr>
                <td className="fw-bold">Total</td>
                <td className="text-end">${order.Total}</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <button onClick={handleReturn} className='btn btn-success'>
              Complete Order
            </button>

            <button onClick={handleReturn} className='btn btn-danger'>
              Reject Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersScreen