import { useForm } from '../../hooks/useForm'
import { FaSearch } from 'react-icons/fa';

const Search = ({handleSearch}) => {
  const [ value, handleInputChange ] = useForm({
    searchtext: '',
  })
  
  const onClick = (e) => {
    e.preventDefault()
    handleSearch(value.searchtext)
  }

  const onChange = (e) => {
    handleInputChange(e)
    if(e.target.value === '')
      handleSearch(value.searchtext)
  }

  return(
    <>
      <div className={'d-flex justify-content-between'}>
        <input
          type="text"
          className="form-control"
          style={{border:0, borderBottom: '1px solid #bbb'}}
          placeholder="Search..."
          name="searchtext"
          autoComplete="off"
          value={ value.searchtext }
          onChange={ onChange }
        />
        <button
          onClick={onClick}
          className="btn btn-outline-primary mt-2 input-group-text"
        >
          <FaSearch />
        </button>
      </div>
    </>
  )
}

export default Search