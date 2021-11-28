import React from 'react';

const Like = ({ liked, onClick }) => {
  let icon = 'favorite';
  if (!liked) icon += '_border';
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

export default Like;
