export const TaxesInfo = ({ order, complete, reject }) => {
  return (
    <div className="Taxes">
      <ul className='list-group mb-4'>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          Subtotal <span className="badge text-dark">${order.Subtotal}</span>
        </li>
        <li className='list-group-item align-items-center'>
          Taxes
          <ul className='list-group' style={{fontSize: '0.9em'}}>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              Total City Tax <span className="badge text-dark">${order.Taxes.CityTax}</span>
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              Total County Tax <span className="badge text-dark">${order.Taxes.CountyTax}</span>
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              Total State Tax <span className="badge text-dark">${order.Taxes.StateTax}</span>
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              Total Federal Tax <span className="badge text-dark">${order.Taxes.FederalTax}</span>
            </li>
          </ul>
        </li>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          Total Taxes <span className="badge text-dark">${order.TotalTaxes}</span>
        </li>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          Total <span className="badge text-dark">${order.Total}</span>
        </li>
      </ul>
      <div className="d-flex justify-content-around mb-3">
        <button onClick={complete}
          className='btn btn-success btn-sm me-2'
          disabled={order.Status==='Completed'}>
          Complete Order
        </button>

        <button onClick={reject} 
          className='btn btn-danger btn-sm'
          disabled={order.Status==='Rejected'}>
          Reject Order
        </button>
      </div>
    </div>
  )
}