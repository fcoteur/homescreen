import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from './components/NavBar'
import About from './components/About'
import Workbench from './components/workbench/Workbench'
import SignIn from './components/SignIn'
import Register from './components/Register'

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Route path="/" exact component={About} />
        <Route path="/workbench/" component={Workbench} />
        <Route path="/signin/" component={SignIn} />
        <Route path="/register/" component={Register} />
      </Router>
    </div>
  );
}

export default App;
