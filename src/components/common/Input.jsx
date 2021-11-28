import React from 'react';
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className='row'>
      <div className='input-field col s12'>
        <label htmlFor={name}>{label}</label>
        <input {...rest} name={name} id={name} className='validate' />
      </div>
      {error && <div className='red-text lighten-2'>{error}</div>}
    </div>
  );
};

export default Input;
