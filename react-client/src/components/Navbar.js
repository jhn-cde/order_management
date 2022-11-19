import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
  const [collapse, setCollapse] = useState(false)
  return(
    <nav className="navbar navbar-expand-sm navbar-light bg-light mt-3">
      <div className='container'>
        <Link 
          className="navbar-brand" 
          to="/orders"
        >
          BLAZE
        </Link>
        <button className="navbar-toggler" 
          type="button"
          onClick={() => {
            console.log(`${collapse}`)
            setCollapse(!collapse)}}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div 
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{display: collapse?'block':'none'}}
        >
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
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
      </div>
    </nav>
  )
}