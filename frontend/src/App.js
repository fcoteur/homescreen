import React from 'react';
import './App.css';
import SignIn from './components/SignIn'
import NavBar from './components/NavBar'
import Register from './components/Register'
import About from './components/About'

function App() {
  return (
    <div className="App">
      <NavBar />
      <About />
    </div>
  );
}

export default App;
