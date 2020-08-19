import React from 'react';
import { NavLink } from 'react-router-dom';
const NavBar = () => {
  return (
    <nav>
      <div className='nav-wrapper grey darken-5   '>
        <NavLink to='/' className='brand-logo '>
          Movie Rental
        </NavLink>
        <ul id='nav-mobile' className='left hide-on-med-and-down right '>
          <li>
            <NavLink to='/'>Movies</NavLink>
          </li>
          <li>
            <NavLink to='/'>Customers</NavLink>
          </li>
          <li>
            <NavLink to='/'>Rental</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
