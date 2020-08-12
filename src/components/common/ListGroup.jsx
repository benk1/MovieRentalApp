import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty }) => {
  return (
    <ul className='collection'>
      {items.map((item) => (
        <li key={item[valueProperty]} className='collection-item'>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
