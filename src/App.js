import React from 'react';
import logo from './logo.svg';
import Navs from './Navs';
import './App.css';
import {UserProvider} from './context/userContext'
function App() {
  return (
    <div className="App">
      <UserProvider>
      <Navs/>
      </UserProvider>
    </div>
  );
}

export default App;
