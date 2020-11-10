import React from 'react';
import { Link, NavLink } from 'react-router-dom';
const NavBar = ({user}) => {
  return (
    <nav>
      <div className='nav-wrapper grey darken-5    '>
        <Link to='/' className='brand-logo '>
          Movie Rental
        </Link>
        <ul id='nav-mobile' className='left hide-on-med-and-down right '>
          <li>
            <NavLink to='/movies'>Movies</NavLink>
          </li>
          <li>
            <NavLink to='/customers'>Customers</NavLink>
          </li>
          <li>
            <NavLink to='/rentals'>Rental</NavLink>
          </li>
          { !user && (
          <>
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
          <li>
            <NavLink to='/register'>Register</NavLink>
          </li>
          </>
          )}
          { user && 
          <>
          <li>
            <NavLink to='/profile'>{user.name}</NavLink>
            
          </li>
          <li>
            <NavLink to='/logout'>Logout</NavLink>
          </li>
          </>
          }
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
