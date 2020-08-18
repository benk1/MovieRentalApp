import React from 'react';

import './App.css';
import Movies from './components/Movies';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className=' container '>
       <NavBar />
      <Movies />
    </div>
  );
}

export default App;
