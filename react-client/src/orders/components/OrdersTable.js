import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectOrdersPage, selectOrdersRowsPerPage, selectOrdersSlice, setOrdersPage } from "../actions/ordersPageSlice"
import { selectOrders } from "../actions/ordersSlice"
import { getRange } from "../../utils/getRange"
import { fetchOrdersSlice } from "../../api/orders"
import { TableContainer } from "../../components/TableContainer"
import { Search } from "../../components/Search"

export const OrdersTable = ({ actions }) => {
  const [range, setRange] = useState([])
  const dispatch = useDispatch()
  const rowsPerPage = useSelector(selectOrdersRowsPerPage)
  const orders = useSelector(selectOrders)
  const slice = useSelector(selectOrdersSlice)
  const page = useSelector(selectOrdersPage)

  useEffect(() => {
    const tmpRange = getRange(orders, rowsPerPage)
    setRange([...tmpRange])

    dispatch(fetchOrdersSlice({
      page: page-1, 
      rowsPerPage: rowsPerPage,
      searchtext: ''
    }))
  }, [rowsPerPage, page, orders, dispatch]);
  
  const handleSearch = (searchtext) => {
    dispatch(fetchOrdersSlice({page:0, rowsPerPage, searchtext}))
  }

  if(!slice || slice.length === 0){
    return(<span>Loading...</span>)
  }
  return(
    <div>
      <div className='d-flex justify-content-end mb-4'>
          <Search handleSearch={handleSearch}/>
      </div>
      <TableContainer
        setPage={(newPage) => dispatch(setOrdersPage(newPage))}
        range={range}
        page={page}
      >
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
            slice.map((order, index) => {
              return (
                <tr key={order.Number}>
                  <td>{order.Number}</td>
                  <td>{order.Consumer}</td>
                  <td>{order.Status}</td>
                  <td>{new Date(order.Date).toLocaleDateString()}</td>
                  <td>${order.Total}</td>
                  <td>
                    {actions.map(action => 
                      <li
                        key={action.name}
                        onClick={() => action.action(order.Number)}
                        className='btn btn-link btn-sm p-0 me-1'>{action.name}
                      </li>
                    )}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </TableContainer>
    </div>
  )
}