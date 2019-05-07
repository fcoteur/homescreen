import React from 'react'
import PropTypes from 'prop-types'

import BookmarksApp from './tools/BookmarksApp';
import TodosApp from './tools/TodosApp';
import LocationsApp from './tools/LocationsApp';

Workbench.propTypes = {
  userData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

function Workbench(props) {
  
  const {userData, isLoading} = props;

  return (
    <div>
      {isLoading ? <span><strong>Data is loading</strong></span> : null}
      <BookmarksApp bookmarks={userData.bookmarks}/>
      <TodosApp todos={userData.todos}/>
      <LocationsApp locations={userData.locations} />
    </div>
  )
}

export default Workbench;
