import React from 'react';
const Input = ({ value, name, label, error, onChange }) => {
  return (
    <div className='row'>
      <div className='input-field col s12'>
        <input
          value={value}
          name={name}
          onChange={onChange}
          id={name}
          type='text'
          className='validate'
        />
        <label htmlFor={name}>{label}</label>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default Input;
