import React from 'react';
import _ from 'lodash';
const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);
  return (
    <ul className='pagination paginateStyle'>
      <li className='disabled'>
        <i className='material-icons'>chevron_left</i>
      </li>
      {pages.map((page) => (
        <>
          <li key={page} className={page === currentPage ? 'active' : 'null'}>
            <a href='#!' onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        </>
      ))}
      <li className='waves-effect'>
        <a href='#!'>
          <i onClick={() => onPageChange()} className='material-icons'>chevron_right</i>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
