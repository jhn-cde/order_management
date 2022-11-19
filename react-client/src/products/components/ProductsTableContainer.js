import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsSlice } from "../../api/products"
import { Search } from "../../components/Search"
import { getRange } from "../../utils/getRange"
import { ProductsTable } from "./ProductsTable"
import { useNavigate } from "react-router-dom"
import { selectProductsPage, selectProductsrowsPerPage, selectProductsSlice, setProductsPage } from "../actions/productsPageSlice"
import { deleteProduct, selectProducts } from "../actions/productsSlice"
import { TableContainer } from "../../components/TableContainer"

export const ProductsTableContainer = () => {
  const navigate = useNavigate()
  const [range, setRange] = useState([])
  const rowsPerPage = useSelector(selectProductsrowsPerPage)
  const products = useSelector(selectProducts)
  const slice = useSelector(selectProductsSlice)
  const page = useSelector(selectProductsPage)
  const dispatch = useDispatch()

  useEffect(() => {
    const tmpRange = getRange(products, rowsPerPage)
    setRange([...tmpRange])

    dispatch(fetchProductsSlice({
      page: page-1, 
      rowsPerPage: rowsPerPage,
      searchtext: ''
    }))
  }, [rowsPerPage, page, products, dispatch]);
  
  const setPage = (newPage) => {
    dispatch(setProductsPage(newPage))
  }

  const handleSearch = (searchtext) => {
    dispatch(fetchProductsSlice({page:0, rowsPerPage, searchtext}))
  }

  const deleteProd = (id) => {
    if(window.confirm(`Are you sure you want to delete the product with ${id}`)){
      dispatch(deleteProduct({id}))
      dispatch(fetchProductsSlice({page: page-1, rowsPerPage, searchtext:''}))
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