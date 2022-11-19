import { useForm } from '../hooks/useForm'

export const Search = ({handleSearch}) => {
  const [ value, handleInputChange ] = useForm({
    searchtext: '',
  })
  
  const onSubmitChange = (e) => {
    e.preventDefault()
    handleSearch(value.searchtext)
  }

  //if searchtext empty, call parent handleSearch
  const onChange = (e) => {
    handleInputChange(e)
    if(e.target.value === ''){
      handleSearch(value.searchtext)
    }
  }

  return(
    <>
      <form className={'d-flex justify-content-between'}>
        <input
          type="text"
          className="form-control"
          style={{
            border:0,
            borderRadius: 4,
            borderBottom: '1px solid #bbb'}}
          placeholder="Search..."
          name="searchtext"
          autoComplete="off"
          value={ value.searchtext }
          onChange={ onChange }
        />
        <button
          style={{}}
          onClick={onSubmitChange}
          className="btn btn-outline-primary mt-2 input-group-text"
        >
          Search
        </button>
      </form>
    </>
  )
}