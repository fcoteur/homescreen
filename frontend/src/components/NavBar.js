import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    margin: '5px'
  },
  toolbarTitle: {  
    flex: 1
  },
  button: {
    margin: '5px'
  }
};

function NavBar(props) {
  const { classes } = props;

  return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Button href='/' className={classes.toolbarTitle}>
          <Icon className={classes.icon} href='/'>whatshot</Icon>
          <Typography variant="h6" color="inherit" align='left' noWrap > 
            Web Developments - Francis Coteur
          </Typography>
          </Button>
          <Button color="primary" variant="outlined" href='/register/' className={classes.button}>
            Register
          </Button>
          <Button color="primary" variant="outlined" href='/signin/' className={classes.button}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);