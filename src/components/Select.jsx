import React from 'react';
const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className='row'>
      <div className='input-field col s12 '>
        <select name={name} id={name} {...rest} className='validate'>
          <option value='' disabled selected />
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        <label htmlFor={name}>{label}</label>
      </div>
      {error && <div className='red-text lighten-2'>{error}</div>}
    </div>
  );
};

export default Select;
