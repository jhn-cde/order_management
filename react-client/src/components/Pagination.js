export const Pagination = ({range, curPage, setPage}) => {
  
  const changePage = (num) => {
    const newPage = curPage + num
    if(newPage > 0 && newPage <= range.length){
      setPage(newPage)
    }else{
      console.log('error, range limit')
    }
  }
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item me-1 ${curPage===1&&'disabled'}`}>
          <button 
            className="page-link" 
            onClick={() => changePage(-1)}
          >
            Previous
          </button>
        </li>
        {
          range.map(page =>
            <li className={`page-item ${page===curPage&&'active'}`} key={page}>
              <button
                className="page-link"
                onClick={() => setPage(page)}
              >
                {page}
              </button>
            </li> 
          )
        }
        <li className={`page-item ms-1 ${curPage===range.length&&'disabled'}`}>
          <button 
            className="page-link" 
            onClick={() => changePage(1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}