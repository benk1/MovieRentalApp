import React from 'react';

const Edit = ({  onClick }) => {
  let icon = 'create';
  
  return (
    <i
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className='material-icons'
    >
      {icon}
    </i>
  );
};

export default Edit;