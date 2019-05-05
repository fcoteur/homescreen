import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';

import NavBar from './components/NavBar'
import About from './components/About'
import Workbench from './components/workbench/Workbench'
import Earlyapps from './components/earlyapps/Earlyapps'
import SignIn from './components/SignIn'
import Register from './components/Register'

import { withStyles } from '@material-ui/core/styles';

const styles = {
  app: {  },
  main: { }
}

const userData= {
  todos:[
    {
      done:false,
      created:"2019-04-26T19:57:08.374Z",
      _id:"5cc3629485c63913f812a533",
      title:"eat something good"
    },
    {
      done:true,
      created:"2019-04-26T20:27:31.443Z",
      _id:"5cc369b3ff75d71910307b18",
      title:"eat something ugly"
    }
  ],
  bookmarks:[
    {
      created:"2019-04-26T20:25:29.064Z",
      _id:"5cc3693901173b1849d8a5e6",
      name:"google",
      url:"https://material-ui.com/style/links/#accessibility" 
    },
    {
      created:"2019-04-26T20:25:44.296Z",
      _id:"5cc3694801173b1849d8a5e7",
      name:"yahoo",
      url:"https://material-ui.com/style/links/#accessibility"
    }
  ],
  locations:[
    {
      created:"2019-04-26T19:53:49.602Z",
      _id:"5cc361cd6fd56e1342563046",
      city:"Madrid",
      countryCode:"ES"
    },
    {
      created:"2019-04-26T19:54:17.372Z",
      _id:"5cc361e96fd56e1342563047",
      city:"Barcelona",
      countryCode:"ES"
    }
  ]
}

function App(props) {
  const [count, setCount] = useState(0);
  const { classes } = props;

  useEffect(() => {
    
    document.title = `You clicked ${count} times`;
  });

  return (
    <div className={classes.app}>
      <NavBar />
      <div className={classes.main}>
      <Router >
        <Route path="/" exact component={About} />
        <Route path="/workbench/" render={(props) => <Workbench {...props} userData={userData} />} />
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
