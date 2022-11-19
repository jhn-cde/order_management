import { useEffect, useState } from "react"
import { getRange } from "../../utils/getRange"

const Pagination = ({itemList, setPage, rowsPerPage=5}) => {
  const [range, setRange] = useState([])

  // change range with itemList
  useEffect(() => {
    const range = getRange(itemList, rowsPerPage)
    setRange([...range])
  }, [itemList, rowsPerPage]);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {
          range.map(page =>
            <li className="page-item" key={page}>
              <button
                className="page-link"
                onClick={() => setPage(page)}
              >
                {page}
              </button>
            </li> 
          )
        }
      </ul>
    </nav>
  )
}

export default Pagination