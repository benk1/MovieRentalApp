import React from 'react';
const SearchBox = ({onChange, value }) => {
  return (
    <div class='row'>
      <div class='input-field col s12'>
        <input
          id='email'
          type='text'
          name='query'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          class='validate'
        />
        <label for='email'>Search...</label>
      </div>
    </div>
  );
};

export default SearchBox;
