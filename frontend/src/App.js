import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios'

import NavBar from './components/NavBar'
import About from './components/About'
import Workbench from './components/workbench/Workbench'
import Earlyapps from './components/earlyapps/Earlyapps'
import SignIn from './components/login/SignIn'
import Register from './components/login/Register'

import { withStyles } from '@material-ui/core/styles';

const styles = {
  app: { },
  main: { }
}

function App(props) {
  const [userData, setUserData] = useState({
    todos:[],
    bookmarks:[],
    locations:[]
  });
  const [isLoading, setIsLoading] = useState(false);

  const { classes } = props;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get(process.env.REACT_APP_SERVER + 'users/');
      setUserData(result.data.list[0]); 
      setIsLoading(false);
    }
    fetchData()
  }, []);        

  return (
    <div className={classes.app}>
      <NavBar />
      <div className={classes.main}>
      <Router >
        <Route path="/" exact component={About} />
        <Route path="/workbench/" render={(props) => <Workbench {...props} userData={userData} isLoading={isLoading} />} />
        <Route path="/signin/" component={SignIn} />
        <Route path="/register/" component={Register} />
        <Route path="/earlyapps/" component={Earlyapps} />
      </Router>
      </div>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
