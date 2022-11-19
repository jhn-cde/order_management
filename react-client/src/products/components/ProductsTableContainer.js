import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Search } from "../../components/Search"
import { getRange } from "../../utils/getRange"
import { ProductsTable } from "./ProductsTable"
import { useNavigate } from "react-router-dom"
import { selectProducts, selectProductsPage, selectProductsRowsPerPage, setProductsPage } from "../actions/productsSlice"
import { TableContainer } from "../../components/TableContainer"
import { deleteProduct, fetchProducts } from "../../api/products"
import { api } from "../../api/api"

export const ProductsTableContainer = () => {
  const navigate = useNavigate()
  const [range, setRange] = useState([])
  const rowsPerPage = useSelector(selectProductsRowsPerPage)
  const slice = useSelector(selectProducts)
  const page = useSelector(selectProductsPage)
  const dispatch = useDispatch()

  useEffect(() => {
    api.get('/api/orders/count')
      .then((res) => {
        const tmpRange = getRange(res.data.count, rowsPerPage)
        setRange([...tmpRange])
      })
      .catch((err) => {
        if(err)
        console.log('get count', err)
      });

    dispatch(fetchProducts({
      page: page-1, 
      rowsPerPage: rowsPerPage,
      searchtext: ''
    }))
  }, [rowsPerPage, page, dispatch]);
  
  const setPage = (newPage) => {
    dispatch(setProductsPage(newPage))
  }

  const handleSearch = (searchtext) => {
    dispatch(fetchProducts({page:0, rowsPerPage, searchtext}))
  }

  const deleteProd = (id) => {
    if(window.confirm(`Are you sure you want to delete the product with ${id}`)){
      dispatch(deleteProduct(id))
      dispatch(fetchProducts({
        page: page-1, 
        rowsPerPage: rowsPerPage,
        searchtext: ''
      }))
    }
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
        setPage={setPage}
        range={range}
        page={page}
      >
        <ProductsTable
          actions={[
            {
              name: 'Edit',
              action: (id) => navigate(`/products/${id}`)
            },
            {
              name: 'Delete',
              action: deleteProd
            }
          ]}
          products={slice}
          setPage={setPage}
          range={range}
          page={page}
        />
      </TableContainer>
    </div>
  )
}