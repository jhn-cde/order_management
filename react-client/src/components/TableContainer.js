import { Pagination } from "./Pagination"

export const TableContainer = ({children, range, page, setPage}) => {
  return(
    <div className="customTable">
      <table className="table table-striped">
        {children}
      </table>
      {
        range.length > 0 &&
        <div className="d-flex justify-content-end">
          <Pagination
            range={range}
            curPage={page}
            setPage={setPage}
          />
        </div>
      }
    </div>
  )
}