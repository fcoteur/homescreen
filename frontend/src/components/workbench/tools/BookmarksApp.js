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

BookmarksApp.propTypes = {
  bookmarks: PropTypes.array.isRequired
}

function BookmarksApp(props) {
  
  const { bookmarks } = props;

  const bookmarksList = bookmarks.map(element => {
    return (
      <React.Fragment key={element._id}>
        <span >
          {String.fromCharCode(0x2716)}
          {String.fromCharCode(0x270E)}
          {' '}
          <a href={element.url}>
            {element.name}
          </a>
        </span>
        <br/>
      </React.Fragment>
    );
  })

  return (
    <Box>
      <span>
        <strong>Bookmarks</strong>
        {' '}
        <strong>+</strong>
      </span>
      <br/>
      {bookmarksList}
    </Box>
  )
}


export default BookmarksApp

