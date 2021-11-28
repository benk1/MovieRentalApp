import React from 'react';
const SearchBox = ({ onChange, value }) => {
  return (
    <div className='row'>
      <div className='input-field col s12'>
        <input
          id='email'
          type='text'
          name='query'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='validate'
        />
        <label htmlFor='email'>Search...</label>
      </div>
    </div>
  );
};

export default SearchBox;
