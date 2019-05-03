import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  appBar: { },
  toolbarTitle: {  
    flex: 1,
  }
};

function NavBar(props) {
  const { classes } = props;

  return (
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" align='left' noWrap className={classes.toolbarTitle}>
            Web Developments - Francis Coteur
          </Typography>
          <Button color="primary" variant="outlined">
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