import React from 'react';
import { Link, NavLink } from 'react-router-dom';
const NavBar = () => {
  return (
    <nav>
      <div class='nav-wrapper'>
        <a href='#' class='brand-logo right'>
          Movie Rental
        </a>
        <ul id='nav-mobile' class='left hide-on-med-and-down'>
          <li>
            <a href='sass.html'>Movies</a>
          </li>
          <li>
            <a href='badges.html'>Customers</a>
          </li>
          <li>
            <a href='collapsible.html'>Rental</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
