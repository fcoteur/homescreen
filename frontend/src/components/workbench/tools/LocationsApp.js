import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.div`
  margin: 5px 5px;
  padding: 5px 5px;
  width: 300px;
  text-align: left;
  border: 1pt solid black;
`;

LocationsApp.propTypes = {
  locations: PropTypes.array.isRequired
}

function LocationsApp(props) {
  
  const { locations } = props;

  const LocationsList = locations.map(element => {
    const date = new Date(Date.now())
    const hourUTC = date.getUTCHours() + element.utcDiff + 'h' 
    const minURC = (date.getUTCMinutes()<=9) ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()
    return (
      <React.Fragment key={element._id}>
        <span >
          {String.fromCharCode(0x2716)}
          {String.fromCharCode(0x270E)}
          {' '}
          {element.city}
          {' '}
          {hourUTC+minURC}
        </span>
        <br/>
      </React.Fragment>
    );
  })

  return (
    <Box>
      <span>
        <strong>Locations</strong>
        {' '}
        <strong>+</strong>  
      </span><br/>
      {LocationsList}
    </Box>
  )
}


export default LocationsApp

