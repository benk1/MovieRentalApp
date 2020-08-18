import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);
  return (
    <ul className='pagination paginateStyle'>
      <li className='waves-effect'>
        <Link to='/'>
          <i className='material-icons'>chevron_left</i>
        </Link>
      </li>
      {pages.map((page) => (
        <li key={page} className={page === currentPage ? 'active' : 'null'}>
          <>
            <Link to='/' onClick={() => onPageChange(page)}>
              {page}
            </Link>
          </>
        </li>
      ))}
      <li className='waves-effect'>
        <Link to='/'>
          <i onClick={() => onPageChange()} className='material-icons'>
            chevron_right
          </i>
        </Link>
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
