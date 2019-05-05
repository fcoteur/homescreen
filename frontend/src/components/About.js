import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const styles = {
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    width: '300px',
    margin: '30px',
    textAlign: 'left',

  }
};


function About(props) {

  const { classes } = props;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <Typography variant="body1" gutterBottom>
          This site contains different applications that I have built during my journey to learn the craft of building web applications
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Languages and tools used
          </Typography>
          <Typography variant="body1" gutterBottom>
            <ul>
              <li>HTML, CSS, Javascript</li>
              <li>React</li>
              <li>Node.js, Express</li>
              <li>MongoDB</li>
            </ul>      
        </Typography>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            My repositories
          </Typography>
          <Typography variant="body" gutterBottom>
            <ul>
              <li><a href="https://codepen.io/fcoteur/">CodePen</a></li>
              <li><a href="https://github.com/fcoteur">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/fcoteur/">LinkedIn</a></li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);