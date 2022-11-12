import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return(
    <nav className="navbar navbar-expand-sm">
      <Link 
        className="navbar-brand" 
        to="/orders"
      >
        BLAZE
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink 
            className={({isActive}) => "nav-item nav-link " + (isActive ? 'active' : '')} 
            to="/orders"
          >
            Orders
          </NavLink>

          <NavLink 
            className={({isActive}) => "nav-item nav-link " + (isActive ? 'active' : '')}
            to="/products"
          >
            Products
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar